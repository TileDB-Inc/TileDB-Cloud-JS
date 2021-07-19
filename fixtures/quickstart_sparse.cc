#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>
using namespace tiledb;
// Name of array.
std::string array_name("fixed_a0_a3");
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
    // Fixed length attribute
    schema.add_attribute(Attribute::create<int>(ctx, "a3"));
    schema.add_attribute(Attribute::create<int>(ctx, "a0"));

    // Create the (empty) array on disk.
    Array::create(array_name, schema);
}
void write_array()
{
    Context ctx;
    // Prepare some data for the array
    std::vector<int> a3_data = {
        1, 12, 23, 44, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

    std::vector<int> a0_data = {
        1, 12, 234, 17, 53, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

    // Open the array for writing and create the query
    Array array(ctx, array_name, TILEDB_WRITE);
    Query query(ctx, array);
    query.set_layout(TILEDB_ROW_MAJOR)
        .set_buffer("a0", a0_data)
        .set_buffer("a3", a3_data);
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
    std::vector<int> a3_data(3);
    std::vector<int> a0_data(3);

    // Prepare and submit the query, and close the array
    Query query(ctx, array);
    query.set_subarray(subarray)
        .set_layout(TILEDB_ROW_MAJOR)
        .set_buffer("a0", a0_data)
        .set_buffer("a3", a3_data);

    // This mimics the body posted to the server
    std::vector<uint8_t> serialized_body;
    serialize_query(ctx, query, &serialized_body, true);
    std::ofstream body_file;
    body_file.open("body_fixed_new.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

    query.submit();
    // this mimics the response from the server
    std::vector<uint8_t> serialized_response;
    serialize_query(ctx, query, &serialized_response, false);
    std::ofstream response_file;
    response_file.open("response_fixed_new.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_response)
        response_file << d;
    response_file.close();
    array.close();
    
    // Print out the results for fixed-length attribute
    for (auto d : a3_data)
        std::cout << d << " ";
    std::cout << "\n";

    for (auto d : a0_data)
        std::cout << d << " ";
    std::cout << "\n";

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