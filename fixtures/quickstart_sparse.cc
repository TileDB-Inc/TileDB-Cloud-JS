/**
 * @file   quickstart_sparse.cc
 *
 * @section LICENSE
 *
 * The MIT License
 *
 * @copyright Copyright (c) 2018-2021 TileDB, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @section DESCRIPTION
 *
 * When run, this program will create a simple 2D sparse array, write some data
 * to it, and read a slice of the data back.
 */

#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>

using namespace tiledb;

// Name of array.
std::string array_uri("quickstart_sparse_array");

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
                            std::vector<uint8_t> *serialized, bool clientside) {
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
  auto deleter = [](tiledb_buffer_t *b) { tiledb_buffer_free(&b); };
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
                              bool clientside) {
  tiledb_buffer_t *c_buff;
  ctx.handle_error(tiledb_buffer_alloc(ctx.ptr().get(), &c_buff));

  // Wrap in a safe pointer
  auto deleter = [](tiledb_buffer_t *b) { tiledb_buffer_free(&b); };
  std::unique_ptr<tiledb_buffer_t, decltype(deleter)> buff_ptr(c_buff, deleter);

  ctx.handle_error(tiledb_buffer_set_data(
      ctx.ptr().get(), c_buff, reinterpret_cast<void *>(&serialized[0]),
      static_cast<uint64_t>(serialized.size())));

  // Deserialize
  ctx.handle_error(tiledb_deserialize_query(ctx.ptr().get(), c_buff,
                                            TILEDB_CAPNP, clientside ? 1 : 0,
                                            query->ptr().get()));
}

void create_array() {
  // Create a TileDB context.
  Context ctx;

  // The array will be 4x4 with dimensions "rows" and "cols", with domain [1,4].
  Domain domain(ctx);
  domain.add_dimension(Dimension::create<int>(ctx, "rows", {{1, 4}}, 4))
      .add_dimension(Dimension::create<int>(ctx, "cols", {{1, 4}}, 4));

  // The array will be sparse.
  ArraySchema schema(ctx, TILEDB_SPARSE);
  schema.set_domain(domain).set_order({{TILEDB_ROW_MAJOR, TILEDB_ROW_MAJOR}});

  // Add a single attribute "a" so each (i,j) cell can store an integer.
  schema.add_attribute(Attribute::create<int>(ctx, "a"));

  // Create the (empty) array on disk.
  Array::create(array_uri, schema);
}

void write_array() {
  Context ctx;

  // Write some simple data to cells (1, 1), (2, 4) and (2, 3).
  std::vector<int> coords_rows = {1, 2, 2};
  std::vector<int> coords_cols = {1, 4, 3};
  std::vector<int> data = {1, 2, 3};

  // Open the array for writing and create the query.
  Array array(ctx, array_uri, TILEDB_WRITE);
  Query query(ctx, array, TILEDB_WRITE);
  query.set_layout(TILEDB_UNORDERED)
      .set_buffer("a", data)
      .set_buffer("rows", coords_rows)
      .set_buffer("cols", coords_cols);

  // Perform the write and close the array.
  query.submit();
  array.close();
}

void read_array() {
  Context ctx;

  // Prepare the array for reading
  Array array(ctx, array_uri, TILEDB_READ);

  // Slice only rows 1, 2 and cols 2, 3, 4
  const std::vector<int> subarray = {1, 2, 2, 4};

  // Prepare the vector that will hold the result.
  // We take an upper bound on the result size, as we do not
  // know a priori how big it is (since the array is sparse)
  std::vector<int> data(3);
  std::vector<int> coords_rows(3);
  std::vector<int> coords_cols(3);

  // Prepare the query
  Query query(ctx, array, TILEDB_READ);
  query.set_subarray(subarray)
      .set_layout(TILEDB_ROW_MAJOR)
      .set_buffer("a", data)
      .set_buffer("rows", coords_rows)
      .set_buffer("cols", coords_cols);

  // This mimics the body posted to the server
  std::vector<uint8_t> serialized_body;
  serialize_query(ctx, query, &serialized_body, true);
  std::ofstream body_file;
  body_file.open("body2.raw", std::ios::out | std::ios::binary);
  for (const auto &d : serialized_body)
    body_file << d;
  body_file.close();

  // Submit the query and close the array.
  query.submit();

  // this mimics the response from the server
  std::vector<uint8_t> serialized_response;
  serialize_query(ctx, query, &serialized_response, true);
  std::ofstream response_file;
  response_file.open("response2.raw", std::ios::out | std::ios::binary);
  for (const auto &d : serialized_response)
    response_file << d;
  response_file.close();

  array.close();

  // Print out the results.
  auto result_num = (int)query.result_buffer_elements()["a"].second;
  for (int r = 0; r < result_num; r++) {
    int i = coords_rows[r];
    int j = coords_cols[r];
    int a = data[r];
    std::cout << "Cell (" << i << ", " << j << ") has data " << a << "\n";
  }
}

int main() {
  Context ctx;

  if (Object::object(ctx, array_uri).type() != Object::Type::Array) {
    create_array();
    write_array();
  }

  read_array();
  return 0;
}
