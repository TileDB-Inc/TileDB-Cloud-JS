/**
 * @file   multi_attribute.cc
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
 * When run, this program will create a simple 2D dense array with two
 * attributes, write some data to it, and read a slice of the data back on
 * (i) both attributes, and (ii) subselecting on only one of the attributes.
 */

#include <iostream>
#include <tiledb/tiledb>
#include <tiledb/tiledb_serialization.h>
#include <fstream>

using namespace tiledb;

// Name of array.
std::string array_name("multi_attribute_array");



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

  // If the array already exists on disk, return immediately.
  if (Object::object(ctx, array_name).type() == Object::Type::Array)
    return;

  // The array will be 4x4 with dimensions "rows" and "cols", with domain [1,4].
  Domain domain(ctx);
  domain.add_dimension(Dimension::create<int>(ctx, "rows", {{1, 4}}, 4))
      .add_dimension(Dimension::create<int>(ctx, "cols", {{1, 4}}, 4));

  // The array will be dense.
  ArraySchema schema(ctx, TILEDB_DENSE);
  schema.set_domain(domain).set_order({{TILEDB_ROW_MAJOR, TILEDB_ROW_MAJOR}});

  // Add two attributes "a1" and "a2", so each (i,j) cell can store
  // a character on "a1" and a vector of two floats on "a2".
  schema.add_attribute(Attribute::create<char>(ctx, "a1"));
  schema.add_attribute(Attribute::create<float[2]>(ctx, "a2"));

  // Create the (empty) array on disk.
  Array::create(array_name, schema);
}

void write_array() {
  Context ctx;

  // Prepare some data for the array
  std::vector<char> a1 = {'a',
                          'b',
                          'c',
                          'd',
                          'e',
                          'f',
                          'g',
                          'h',
                          'i',
                          'j',
                          'k',
                          'l',
                          'm',
                          'n',
                          'o',
                          'p'};
  std::vector<float> a2 = {1.1f,  1.2f,  2.1f,  2.2f,  3.1f,  3.2f,  4.1f,
                           4.2f,  5.1f,  5.2f,  6.1f,  6.2f,  7.1f,  7.2f,
                           8.1f,  8.2f,  9.1f,  9.2f,  10.1f, 10.2f, 11.1f,
                           11.2f, 12.1f, 12.2f, 13.1f, 13.2f, 14.1f, 14.2f,
                           15.1f, 15.2f, 16.1f, 16.2f};

  // Open the array for writing and create the query.
  Array array(ctx, array_name, TILEDB_WRITE);
  Query query(ctx, array);
  query.set_layout(TILEDB_ROW_MAJOR)
      .set_buffer("a1", a1)
      .set_buffer("a2", a2);

  // Perform the write and close the array.
  query.submit();
  array.close();
}

void read_array() {
  Context ctx;

  // Prepare the array for reading
  Array array(ctx, array_name, TILEDB_READ);

  // Slice only rows 1, 2 and cols 2, 3, 4
  const std::vector<int> subarray = {1, 2, 2, 4};

  // Prepare the vector that will hold the result
  // (of size 6 elements for "a1" and 12 elements for "a2" since
  // it stores two floats per cell)
  std::vector<char> data_a1(6);
  std::vector<float> data_a2(12);

  // Prepare the query
  Query query(ctx, array);
  query.set_subarray(subarray)
      .set_layout(TILEDB_ROW_MAJOR)
      .set_buffer("a1", data_a1)
      .set_buffer("a2", data_a2);

  // Submit the query and close the array.
  query.submit();
  array.close();

  // Print out the results.
  std::cout << "Reading both attributes a1 and a2:\n";
  for (int i = 0; i < 6; ++i)
    std::cout << "a1: " << data_a1[i] << ", a2: (" << data_a2[2 * i] << ","
              << data_a2[2 * i + 1] << ")\n";
  std::cout << "\n";
}

void read_array_subselect() {
  Context ctx;

  // Prepare the array for reading
  Array array(ctx, array_name, TILEDB_READ);

  // Slice only rows 1, 2 and cols 2, 3, 4
  const std::vector<int> subarray = {1, 2, 2, 4};

  // Prepare the vector that will hold the result
  // (of size 6 elements for "a1")
  std::vector<char> data_a1(6);

  // Prepare the query - subselect over "a1" only
  Query query(ctx, array);
  query.set_subarray(subarray)
      .set_layout(TILEDB_ROW_MAJOR)
      .set_buffer("a1", data_a1);


  // This mimics the body posted to the server
    std::vector<uint8_t> serialized_body;
    serialize_query(ctx, query, &serialized_body, true);
    std::ofstream body_file;
    body_file.open("body_multi_attr.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_body)
        body_file << d;
    body_file.close();

  // Submit the query and close the array.
  query.submit();


  std::vector<uint8_t> serialized_response;
    serialize_query(ctx, query, &serialized_response, false);
    std::ofstream response_file;
    response_file.open("response_multi_attr.raw", std::ios::out | std::ios::binary);
    for (const auto &d : serialized_response)
        response_file << d;
    response_file.close();


  array.close();

  // Print out the results.
  std::cout << "Subselecting on attribute a1:\n";
  for (int i = 0; i < 6; ++i)
    std::cout << "a1: " << data_a1[i] << "\n";
}

int main() {
  create_array();
  write_array();
  read_array();
  read_array_subselect();
  return 0;
}