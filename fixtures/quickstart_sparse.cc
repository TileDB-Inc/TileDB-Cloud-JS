#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>
using namespace tiledb;
// Name of array.
std::string array_name("variable_length_array_qstart");
/**
 * Helper function that serializes a query from the "client" or "server"
 * perspective. The flow being mimicked here is (for read queries):
 *
 * - Client sets up read query object including buffers.
 * - Client submits query to a remote array.
 * - Internal code (not C API) serializes that query and send it via curl.
 * - Server receives and deserializes the query using the C API.
 * - Server submits query.
 * - Server serializes (using C API) the query and sends it back.
 * - Client receives response and deserializes the query (not C API). This
 *   copies the query results into the original user buffers.
 * - Client's blocking call to tiledb_query_submit() now returns.
 */
static void serialize_query(const Context &ctx, Query &query,
                            std::vector<uint8_t> *serialized, bool clientside)
{
    // Serialize
    tiledb_buffer_list_t *buff_list;
    ctx.handle_error(tiledb_serialize_query(ctx.ptr().get(), query.ptr().get(),
                                            TILEDB_CAPNP, clientside ? 1 : 0,
                                            &buff_list));
    // Flatten
    tiledb_buffer_t *c_buff;
    ctx.handle_error(
        tiledb_buffer_list_flatten(ctx.ptr().get(), buff_list, &c_buff));
    // Wrap in a safe pointer
    auto deleter = [](tiledb_buffer_t *b)
    { tiledb_buffer_free(&b); };
    std::unique_ptr<tiledb_buffer_t, decltype(deleter)> buff_ptr(c_buff, deleter);
    // Copy into user vector
    void *data;
    uint64_t num_bytes;
    ctx.handle_error(
        tiledb_buffer_get_data(ctx.ptr().get(), c_buff, &data, &num_bytes));
    serialized->clear();
    serialized->insert(serialized->end(), static_cast<const uint8_t *>(data),
                       static_cast<const uint8_t *>(data) + num_bytes);
    // Free buffer list
    tiledb_buffer_list_free(&buff_list);
}
/**
 * Helper function that deserializes a query from the "client" or "server"
 * perspective.
 */
static void deserialize_query(const Context &ctx,
                              std::vector<uint8_t> &serialized, Query *query,
                              bool clientside)
{
    tiledb_buffer_t *c_buff;
    ctx.handle_error(tiledb_buffer_alloc(ctx.ptr().get(), &c_buff));
    // Wrap in a safe pointer
    auto deleter = [](tiledb_buffer_t *b)
    { tiledb_buffer_free(&b); };
    std::unique_ptr<tiledb_buffer_t, decltype(deleter)> buff_ptr(c_buff, deleter);
    ctx.handle_error(tiledb_buffer_set_data(
        ctx.ptr().get(), c_buff, reinterpret_cast<void *>(&serialized[0]),
        static_cast<uint64_t>(serialized.size())));
    // Deserialize
    ctx.handle_error(tiledb_deserialize_query(ctx.ptr().get(), c_buff,
                                              TILEDB_CAPNP, clientside ? 1 : 0,
                                              query->ptr().get()));
}
void create_array()
{
    // Create a TileDB context
    Context ctx;
    // The array will be 4x4 with dimensions "rows" and "cols", with domain [1,4]
    Domain domain(ctx);
    domain.add_dimension(Dimension::create<int>(ctx, "rows", {{1, 4}}, 4))
        .add_dimension(Dimension::create<int>(ctx, "cols", {{1, 4}}, 4));
    // The array will be dense
    ArraySchema schema(ctx, TILEDB_DENSE);
    schema.set_domain(domain).set_order({{TILEDB_ROW_MAJOR, TILEDB_ROW_MAJOR}});
    // Add two variable-length attributes "a1" and "a2", the first storing
    // strings and the second storing a variable number of integers.
    schema.add_attribute(Attribute::create<char>(ctx, "a1"));
    schema.add_attribute(Attribute::create<std::vector<uint64_t>>(ctx, "a2"));
    schema.add_attribute(Attribute::create<std::vector<int>>(ctx, "a4"));
    // Fixed length attribute
    schema.add_attribute(Attribute::create<int>(ctx, "a3"));
    schema.add_attribute(Attribute::create<int>(ctx, "a0"));

    Attribute a5 = Attribute::create<int>(ctx, "a5");
    Attribute a6 = Attribute::create<std::vector<int>>(ctx, "a6");

    a5.set_nullable(true);
    a6.set_nullable(true);

    schema.add_attribute(a5);
    schema.add_attribute(a6);

    // Create the (empty) array on disk.
    Array::create(array_name, schema);
}
void write_array()
{
    Context ctx;
    // Prepare some data for the array
    char a1_data = 'abbcccdddeeefghhhijjjkklmnoop';
    std::vector<uint64_t> a1_off = {
        0, 1, 3, 6, 9, 11, 12, 13, 16, 17, 20, 22, 23, 24, 25, 27};
    std::vector<uint64_t> a2_data = {1, 1, 20, 311, 27, 82, 5, 6, 6, 7, 7, 8, 8,
                                     8, 9, 9, 10, 11, 12, 12, 13, 14, 14, 14, 15, 16};
    std::vector<uint64_t> a2_el_off = {
        0, 2, 4, 5, 6, 8, 10, 11, 14, 16, 17, 18, 20, 21, 24, 25};
    std::vector<int> a4_data = {1, 1, 2, 19, 27, 81, 5, 6, 6, 7, 7, 8, 8,
                                8, 9, 9, 10, 11, 12, 12, 13, 14, 14, 14, 15, 16};
    std::vector<uint64_t> a4_el_off = {
        0, 2, 4, 5, 6, 7, 9, 11, 14, 16, 17, 18, 20, 21, 24, 25};
    std::vector<uint64_t> a2_off;
    std::vector<uint64_t> a4_off;
    for (auto e : a2_el_off)
        a2_off.push_back(e * sizeof(uint64_t));
    for (auto e : a4_el_off)
        a4_off.push_back(e * sizeof(int));
    // Prepare some data for the fixed-length attribute a3
    std::vector<int> a3_data = {
        1, 12, 23, 44, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

    std::vector<int> a0_data = {
        1, 12, 234, 17, 53, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

    std::vector<int> a5_data = {1, 8, 223, 17, 59, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};
    std::vector<int> a6_data = {1, 12, 332, 21, 62, 11, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};
    std::vector<uint8_t> a5_validity_buf = {1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1};
    std::vector<uint8_t> a6_validity_buf = {0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1};
    std::vector<uint64_t> a6_el_off = {
        0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};
    std::vector<uint64_t> a6_off;
    for (auto e : a6_el_off)
        a6_off.push_back(e * sizeof(int));

    // Open the array for writing and create the query
    Array array(ctx, array_name, TILEDB_WRITE);
    Query query(ctx, array);
    query.set_layout(TILEDB_ROW_MAJOR)
        .set_buffer("a0", a0_data)
        .set_buffer("a1", a1_off, a1_data)
        .set_buffer("a2", a2_off, a2_data)
        .set_buffer("a4", a4_off, a4_data)
        .set_buffer("a3", a3_data)
        .set_buffer_nullable("a5", a5_data, a5_validity_buf)
        .set_buffer_nullable("a6", a6_off, a6_data, a6_validity_buf);


    // This mimics the body posted to the server
    std::vector<uint8_t> serialized_body;
    serialize_query(ctx, query, &serialized_body, true);
    std::ofstream body_file;
    body_file.open("body_writer_qstart_sparse.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

    // Perform the write and close the array.
    query.submit();
    array.close();
}
void read_array()
{
    Context ctx;
    // Prepare the array for reading
    Array array(ctx, array_name, TILEDB_READ);
    // Slice only rows 1, 2 and cols 2, 3, 4
    const std::vector<int> subarray = {1, 2, 2, 4};
    // Prepare the vectors that will hold the result
    std::vector<uint64_t> a1_off(12);
    char a1_data(9);
    // a1_data.resize(9);
    std::vector<uint64_t> a2_off(12);
    std::vector<uint64_t> a2_data(32);
    std::vector<uint64_t> a4_off(12);
    std::vector<int> a4_data(32);
    // Prepare the vector that will hold the result for ficed-length attribute (of size 6 elements)
    std::vector<int> a3_data(3);
    std::vector<int> a0_data(3);

    std::vector<int> a5_data(4);
    std::vector<uint8_t> a5_validity_buf(a5_data.size());
    std::vector<int> a6_data(8);
    std::vector<uint64_t> a6_off(4);
    std::vector<uint8_t> a6_validity_buf(a6_data.size());
    // Prepare and submit the query, and close the array
    Query query(ctx, array);
    query.add_range(0, 1, 3)
        .add_range(1, 2, 4)
        .add_range(1, 1, 3)
        .set_layout(TILEDB_ROW_MAJOR)
        .set_buffer("a0", a0_data)
        .set_buffer("a2", a2_off, a2_data)
        .set_buffer("a3", a3_data)
        .set_buffer("a1", a1_off, a1_data)
        .set_buffer("a4", a4_off, a4_data)
        .set_buffer_nullable("a5", a5_data, a5_validity_buf)
        .set_buffer_nullable("a6", a6_off, a6_data, a6_validity_buf);

    // This mimics the body posted to the server
    std::vector<uint8_t> serialized_body;
    serialize_query(ctx, query, &serialized_body, true);
    std::ofstream body_file;
    body_file.open("body_qstart_sparse.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

    query.submit();
    // this mimics the response from the server
    std::vector<uint8_t> serialized_response;
    serialize_query(ctx, query, &serialized_response, false);
    std::ofstream response_file;
    response_file.open("response_qstart_sparse.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_response)
        response_file << d;
    response_file.close();
    array.close();
    // Get the string sizes
    auto result_el_map = query.result_buffer_elements();
    auto result_el_a1_off = result_el_map["a1"].first;
    std::vector<uint64_t> a1_str_sizes;
    for (size_t i = 0; i < result_el_a1_off - 1; ++i)
        a1_str_sizes.push_back(a1_off[i + 1] - a1_off[i]);
    auto result_a1_data_size = result_el_map["a1"].second * sizeof(char);
    a1_str_sizes.push_back(result_a1_data_size - a1_off[result_el_a1_off - 1]);
    // Get the strings
    std::vector<char> a1_str;
    for (size_t i = 0; i < result_el_a1_off; ++i)
        a1_str.push_back(char(&a1_data[a1_off[i]], a1_str_sizes[i]));
    // Get the element offsets
    std::vector<uint64_t> a2_el_off;
    auto result_el_a2_off = result_el_map["a2"].first;
    for (size_t i = 0; i < result_el_a2_off; ++i)
        a2_el_off.push_back(a2_off[i] / sizeof(uint64_t));
    // Get the number of elements per cell value
    std::vector<uint64_t> a2_cell_el;
    for (size_t i = 0; i < result_el_a2_off - 1; ++i)
        a2_cell_el.push_back(a2_el_off[i + 1] - a2_el_off[i]);
    auto result_el_a2_data = result_el_map["a2"].second;
    a2_cell_el.push_back(result_el_a2_data - a2_el_off.back());

    std::vector<uint64_t> a4_el_off;
    auto result_el_a4_off = result_el_map["a4"].first;
    for (size_t i = 0; i < result_el_a4_off; ++i)
        a4_el_off.push_back(a4_off[i] / sizeof(int));
    // Get the number of elements per cell value
    std::vector<uint64_t> a4_cell_el;
    for (size_t i = 0; i < result_el_a4_off - 1; ++i)
        a4_cell_el.push_back(a4_el_off[i + 1] - a4_el_off[i]);
    auto result_el_a4_data = result_el_map["a4"].second;
    a4_cell_el.push_back(result_el_a4_data - a4_el_off.back());

    // Print the results
    for (size_t i = 0; i < result_el_a1_off; ++i)
    {
        std::cout << "a1: " << a1_str[i] << ", a2: ";
        for (size_t j = 0; j < a2_cell_el[i]; ++j)
            std::cout << a2_data[a2_el_off[i] + j] << " ";
        std::cout << " a4: ";
        for (size_t j = 0; j < a4_cell_el[i]; ++j)
            std::cout << a4_data[a4_el_off[i] + j] << " ";
        std::cout << "\n";
    }
    // Print out the results for fixed-length attribute
    for (auto d : a3_data)
        std::cout << d << " ";
    std::cout << "\n";

    for (auto d : a0_data)
        std::cout << d << " ";
    std::cout << "\n";

    // Print out the data we read for each nullable atttribute
    unsigned long i = 0;
    std::cout << "a5: " << std::endl;
    for (i = 0; i < 4; ++i)
    {
        std::cout << (a5_validity_buf[i] > 0 ? std::to_string(a5_data[i]) : "NULL");
        std::cout << " ";
    }
    std::cout << std::endl;
    std::cout << "a6: " << std::endl;
    for (i = 0; i < 8; ++i)
    {
        std::cout << (a6_validity_buf[i] > 0 ? std::to_string(a6_data[i]) : "NULL");
        std::cout << " ";
    }
}
int main()
{
    Context ctx;
    if (Object::object(ctx, array_name).type() != Object::Type::Array)
    {
        create_array();
        write_array();
    }
    read_array();
    return 0;
}