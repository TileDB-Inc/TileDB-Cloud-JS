/**
 * @file   quickstart_sparse_string.cc
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
 * When run, this program will create a 2D sparse array with one dimension a
 * string type, and the other an integer. This models closely what a dataframe
 * looks like. The program will write some data to it, and read a slice of the
 * data back.
 */

#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>

using namespace tiledb;

// Name of array.
std::string array_name("quickstart_sparse_string_array_int64");

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

void create_array() {
  // Create a TileDB context.
  Context ctx;

  // The array will be 2d array with dimensions "rows" and "cols"
  // "rows" is a string dimension type, so the domain and extent is null
  Domain domain(ctx);
  domain
      .add_dimension(
          Dimension::create(ctx, "rows", TILEDB_STRING_ASCII, nullptr, nullptr))
      .add_dimension(Dimension::create<int64_t>(ctx, "cols", {{1, 4}}, 4));

  // The array will be sparse.
  ArraySchema schema(ctx, TILEDB_SPARSE);
  schema.set_domain(domain).set_order({{TILEDB_ROW_MAJOR, TILEDB_ROW_MAJOR}});

  // Add a single attribute "a" so each (i,j) cell can store an integer.
  schema.add_attribute(Attribute::create<int32_t>(ctx, "a"));

  // Create the (empty) array on disk.
  Array::create(array_name, schema);
}

void write_array() {
  Context ctx;

  // Write some simple data to cells ("a", 1), ("bb", 4) and ("c", 3).
  std::vector<char> rows = {'a', 'b', 'b', 'c'};
  std::vector<uint64_t> rows_offsets = {0, 1, 3};
  std::vector<int64_t> cols = {1, 4, 3};
  std::vector<int32_t> data = {1, 2, 3};

  // Open the array for writing and create the query.
  Array array(ctx, array_name, TILEDB_WRITE);
  Query query(ctx, array, TILEDB_WRITE);
  query.set_layout(TILEDB_UNORDERED)
      .set_buffer("a", data)
      .set_buffer("rows", rows_offsets, rows)
      .set_buffer("cols", cols);

  // Perform the write and close the array.
  query.submit();
  array.close();
}

void read_array() {
  Context ctx;

  // Prepare the array for reading
  Array array(ctx, array_name, TILEDB_READ);

  // Prepare the query
  Query query(ctx, array, TILEDB_READ);
  // Slice only rows "bb", "c" and cols 3, 4
  query.add_range(0, std::string("a"), std::string("c"));
  query.add_range<int64_t>(1, 2, 4);

  // Prepare the vector that will hold the result.
  // We take an upper bound on the result size, as we do not
  // know a priori how big it is (since the array is sparse)
  std::vector<int32_t> data(3);
  std::vector<char> rows(4);
  std::vector<uint64_t> rows_offsets(3);
  std::vector<int64_t> cols(3);
  query.set_layout(TILEDB_ROW_MAJOR)
      .set_buffer("a", data)
      .set_buffer("rows",rows_offsets, rows)
      .set_buffer("cols", cols);


  // This mimics the body posted to the server
  std::vector<uint8_t> serialized_body;
  serialize_query(ctx, query, &serialized_body, true);
  std::ofstream body_file;
  body_file.open("body_sparse_string64.raw", std::ios::out | std::ios::binary);
  for (const auto &d : serialized_body)
      body_file << d;
  body_file.close();

  // Submit the query and close the array.
  query.submit();

  // this mimics the response from the server
  std::vector<uint8_t> serialized_response;
  serialize_query(ctx, query, &serialized_response, false);
  std::ofstream response_file;
  response_file.open("response_sparse_string64.raw", std::ios::out | std::ios::binary);
  for (const auto &d : serialized_response)
      response_file << d;
  response_file.close();

  array.close();

  // Print out the results.
  auto result_num = query.result_buffer_elements()["rows"];
  for (uint64_t r = 0; r < result_num.first; r++) {
    // For strings we must compute the length based on the offsets
    uint64_t row_start = rows_offsets[r];
    uint64_t row_end =
        r == result_num.first - 1 ? result_num.first : rows_offsets[r + 1] - 1;
    std::string i(rows.data() + row_start, row_end - row_start + 1);
    int64_t j = cols[r];
    int32_t a = data[r];
    std::cout << "Cell (" << i << ", " << j << ") has data " << a << "\n";
  }
}

int main() {
  Context ctx;

  if (Object::object(ctx, array_name).type() != Object::Type::Array) {
    create_array();
    write_array();
  }

  read_array();
  return 0;
}