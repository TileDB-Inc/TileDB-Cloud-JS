import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UDF from "./UDF";

const mock = new MockAdapter(axios);
const BASE_PATH = "https://api.tiledb.com";
const client = new UDF({
  basePath: BASE_PATH + "/v1"
});

describe("UDF", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("Should register udf", async () => {
    mock.onPost(`${BASE_PATH}/v1/udf/ws_demo/demo`).reply(200);

    await client.registerUdf("ws_demo", "demo", {});
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(`${BASE_PATH}/v1/udf/ws_demo/demo`);
  });

  it("Should register a generic udf", async () => {
    mock.onPost(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.registerGenericUdf("demo", "demo", {});
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
    expect(mock.history.post[0].data).toBe('{"type":"generic"}');
  });

  it("Should register a single array udf", async () => {
    mock.onPost(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.registerSingleArrayUdf("demo", "demo", {});
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
    expect(mock.history.post[0].data).toBe('{"type":"single_array"}');
  });

  it("Should update a generic udf", async () => {
    mock.onPatch(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.updateGenericUdf("demo", "demo", {});
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
    expect(mock.history.patch[0].data).toBe('{"type":"generic"}');
  });

  it("Should update a signgle array udf", async () => {
    mock.onPatch(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.updateSingleArrayUdf("demo", "demo", {});
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
    expect(mock.history.patch[0].data).toBe('{"type":"single_array"}');
  });

  it("Should exec a udf", async () => {
    mock.onPost(`${BASE_PATH}/v1/udfs/generic/ws_demo/ts_demo`).reply(200);

    await client.exec("ws_demo", "ts_demo", "demoUDF");
    
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(`${BASE_PATH}/v1/udfs/generic/ws_demo/ts_demo`);
  });

  it("Should get a udf info", async () => {
    mock.onGet(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.info("demo", "demo");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
  });

  it("Should share a udf", async () => {
    mock.onPatch(`${BASE_PATH}/v1/udf/demo/demo/share`).reply(200);

    await client.share("demo", "demo", {});
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(
      `${BASE_PATH}/v1/udf/demo/demo/share`
    );
  });

  it("Should unshare a udf", async () => {
    mock.onPatch(`${BASE_PATH}/v1/udf/demo/demo/share`).reply(200);

    await client.unshare("demo", "demo", "johndoe");
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(
      `${BASE_PATH}/v1/udf/demo/demo/share`
    );
    expect(mock.history.patch[0].data).toBe(
      '{"namespace":"johndoe","actions":[]}'
    );
  });

  it("Should delete a udf", async () => {
    mock.onDelete(`${BASE_PATH}/v1/udf/demo/demo`).reply(200);

    await client.delete("demo", "demo");
    expect(mock.history.delete).toHaveLength(1);
    expect(mock.history.delete[0].url).toBe(`${BASE_PATH}/v1/udf/demo/demo`);
  });
});
