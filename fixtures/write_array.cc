#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>
using namespace tiledb;
// Name of array.
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

void write_var_length_array()
{
    Context ctx;

    // Open the array for writing and create the query
    Array array(ctx, "s3://kostas-tiledb-demo/variable_length_array", TILEDB_WRITE);
    Query query(ctx, array);

    // Prepare some data for the array
    std::string a1_data = "abbcccdddeeefghhhijjjkklmnoop";
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
    body_file.open("body_var_length_write.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

    // Perform the write and close the array.
    query.submit();
    array.close();
}



void write_nullable_attr_array() {
  Context ctx;

  // Prepare some data for the array
  std::vector<int> a1_data = {100, 200, 300, 400};
  std::vector<int> a2_data = {10, 10, 20, 30, 30, 30, 40, 40};
  std::vector<uint64_t> a2_el_off = {0, 2, 3, 6};
  std::vector<uint64_t> a2_off;
  for (auto e : a2_el_off)
    a2_off.push_back(e * sizeof(int));

  const char a3_data_char[] = "abbccddewxyz";
  std::vector<char> a3_data(a3_data_char, a3_data_char + 9);
  std::vector<uint64_t> a3_el_off = {0, 3, 5, 6};
  std::vector<uint64_t> a3_off;
  for (auto e : a3_el_off)
    a3_off.push_back(e * sizeof(char));

  // Open the array for writing and create the query
  Array array(ctx, "s3://kostas-tiledb-demo/nullable_attributes_array", TILEDB_WRITE);

  Query query(ctx, array);
  query.set_layout(TILEDB_ROW_MAJOR);

  // Specify the validity buffer for each attribute
  std::vector<uint8_t> a1_validity_buf = {1, 0, 0, 1};
  std::vector<uint8_t> a2_validity_buf = {0, 1, 1, 0};
  std::vector<uint8_t> a3_validity_buf = {1, 0, 0, 1};
  std::vector<int> subarray = {1, 2, 1, 2};

  // Set the query buffers specifying the validity for each data
  query.set_buffer_nullable("a1", a1_data, a1_validity_buf)
      .set_buffer_nullable("a2", a2_off, a2_data, a2_validity_buf)
      .set_buffer_nullable("a3", a3_off, a3_data, a3_validity_buf)
      .set_subarray(subarray);

 // This mimics the body posted to the server
    std::vector<uint8_t> serialized_body;
    serialize_query(ctx, query, &serialized_body, true);
    std::ofstream body_file;
    body_file.open("body_nullable_attr_write.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

  // Perform the write and close the array.
  query.submit();
  array.close();
}

int main()
{
    Context ctx;
    // write_var_length_array();
    write_nullable_attr_array();
    
    return 0;
}