import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Sql from "./Sql";

const mock = new MockAdapter(axios);
const BASE_PATH = "https://api.tiledb.com";
const client = new Sql({
  basePath: BASE_PATH + "/v1"
});

describe("Sql", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("Should register udf", async () => {
    mock.onPost(`${BASE_PATH}/v1/sql/ws_demo/ts_demo`).reply(200);

    await client.exec(
      "ws_demo",
      "ts_demo",
      "select * from `tiledb://TileDB-Inc/quickstart_dense`"
    );
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(`${BASE_PATH}/v1/sql/ws_demo/ts_demo`);
  });
});
