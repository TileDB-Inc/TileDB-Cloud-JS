import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import TileDBClient from "./TileDBClient";

const mock = new MockAdapter(axios);
const BASE_PATH = "https://api.tiledb.com";
const client = new TileDBClient({});

describe("TileDBClient", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    mock.reset();
    jest.resetModules();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });
  it("Should get array metadata", async () => {
    mock.onGet(`${BASE_PATH}/v1/arrays/demo/demo/metadata`).reply(200);

    await client.info("demo", "demo");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/metadata`
    );
  });

  it("Should get array activity", async () => {
    mock.onGet(`${BASE_PATH}/v1/arrays/demo/demo/activity`).reply(200);

    await client.arrayActivity("demo", "demo");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/activity`
    );
  });

  it("Should get deregister array", async () => {
    mock.onDelete(`${BASE_PATH}/v1/arrays/demo/demo/deregister`).reply(200);

    await client.deregisterArray("demo", "demo");
    expect(mock.history.delete).toHaveLength(1);
    expect(mock.history.delete[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/deregister`
    );
  });

  it("Should get register array", async () => {
    mock.onPost(`${BASE_PATH}/v1/arrays/demo/demo/register`).reply(200);

    await client.registerArray("demo", "demo", {});
    expect(mock.history.post).toHaveLength(1);
    expect(mock.history.post[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/register`
    );
  });

  it("Should list shared array", async () => {
    mock.onGet(`${BASE_PATH}/v1/arrays/demo/demo/share`).reply(200);

    await client.listSharedWith("demo", "demo");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/share`
    );
  });

  it("Should share array", async () => {
    mock.onPatch(`${BASE_PATH}/v1/arrays/demo/demo/share`).reply(200);

    await client.shareArray("demo", "demo", {});
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/share`
    );
  });

  it("Should unshare array", async () => {
    mock.onPatch(`${BASE_PATH}/v1/arrays/demo/demo/share`).reply(200);

    await client.unshareArray("demo", "demo", "johndoe");
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(
      `${BASE_PATH}/v1/arrays/demo/demo/share`
    );

    expect(mock.history.patch[0].data).toEqual(
      `{\"actions\":[],\"namespace\":\"johndoe\"}`
    );
  });

  it("Should list arrays", async () => {
    mock
      .onGet(`${BASE_PATH}/v1/arrays/browser/owned?page=1&per_page=1000`)
      .reply(200);

    await client.listArrays();
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/browser/owned?page=1&per_page=1000`
    );
  });

  it("Should list public arrays", async () => {
    mock
      .onGet(`${BASE_PATH}/v1/arrays/browser/public?page=1&per_page=1000`)
      .reply(200);

    await client.listPublicArrays();
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/browser/public?page=1&per_page=1000`
    );
  });

  it("Should list shared arrays", async () => {
    mock
      .onGet(`${BASE_PATH}/v1/arrays/browser/shared?page=1&per_page=1000`)
      .reply(200);

    await client.listSharedArrays();
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/arrays/browser/shared?page=1&per_page=1000`
    );
  });

  it("Should show an organization", async () => {
    mock.onGet(`${BASE_PATH}/v1/organizations/demo_org`).reply(200);

    await client.organization("demo_org");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(
      `${BASE_PATH}/v1/organizations/demo_org`
    );
  });

  it("Should list all organizations user is part of", async () => {
    mock.onGet(`${BASE_PATH}/v1/organizations`).reply(200);

    await client.organizations();
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(`${BASE_PATH}/v1/organizations`);
  });

  it("Should return user profile", async () => {
    mock.onGet(`${BASE_PATH}/v1/user`).reply(200);

    await client.userProfile();
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(`${BASE_PATH}/v1/user`);
  });

  it("Should rename a notebook", async () => {
    mock.onPatch(`${BASE_PATH}/v1/notebooks/demo/demo/rename`).reply(200);

    await client.renameNotebook("demo", "demo", "new_name");
    expect(mock.history.patch).toHaveLength(1);
    expect(mock.history.patch[0].url).toBe(
      `${BASE_PATH}/v1/notebooks/demo/demo/rename`
    );
    expect(mock.history.patch[0].data).toEqual('{"name":"new_name"}');
  });

  it("Should return a task by id", async () => {
    mock.onGet(`${BASE_PATH}/v1/task/12345`).reply(200);

    await client.task("12345");
    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].url).toBe(`${BASE_PATH}/v1/task/12345`);
  });

  it("Should add default basePath if no config is passed", () => {
    const client = new TileDBClient();
    expect(client.config.basePath).toBe(BASE_PATH + "/v1");
    expect(client.configV2.basePath).toBe(BASE_PATH + "/v2");
  });

  it("Should add default basePath if empty config is passed", () => {
    const client = new TileDBClient({});
    expect(client.config.basePath).toBe(BASE_PATH + "/v1");
    expect(client.configV2.basePath).toBe(BASE_PATH + "/v2");
  });

  it("Should add API versions if env variable is set", () => {
    process.env.TILEDB_REST_HOST = "https://api.dev.tiledb.io";
    const TileDBClient = require("./TileDBClient").default;
    const client = new TileDBClient();
    expect(client.config.basePath).toBe("https://api.dev.tiledb.io/v1");
    expect(client.configV2.basePath).toBe("https://api.dev.tiledb.io/v2");
  });

  it("Should add API versions if env variable is set and pass empty config", () => {
    process.env.TILEDB_REST_HOST = "https://api.dev.tiledb.io";
    const TileDBClient = require("./TileDBClient").default;
    const client = new TileDBClient({});
    expect(client.config.basePath).toBe("https://api.dev.tiledb.io/v1");
    expect(client.configV2.basePath).toBe("https://api.dev.tiledb.io/v2");
  });

  it("Should add API versions if basePath is set", () => {
    const client = new TileDBClient({
      basePath: "https://api.dev.tiledb.io",
    });
    expect(client.config.basePath).toBe("https://api.dev.tiledb.io/v1");
    expect(client.configV2.basePath).toBe("https://api.dev.tiledb.io/v2");
  });

  it("Should initiate APIs with correct basePath", () => {
    const client = new TileDBClient({
      basePath: "https://api.dev.tiledb.io",
    });
    expect((client.ArrayApi as any).basePath).toBe(
      "https://api.dev.tiledb.io/v1"
    );
    expect((client.OrganizationApi as any).basePath).toBe(
      "https://api.dev.tiledb.io/v1"
    );
    expect((client.UserApi as any).basePath).toBe(
      "https://api.dev.tiledb.io/v1"
    );
    expect((client.NotebookApi as any).basePath).toBe(
      "https://api.dev.tiledb.io/v1"
    );
    expect((client.TasksApi as any).basePath).toBe(
      "https://api.dev.tiledb.io/v1"
    );
    expect(client.udf.config.basePath).toBe("https://api.dev.tiledb.io/v1");
    expect(client.sql.config.basePath).toBe("https://api.dev.tiledb.io/v1");
    expect(client.query.configurationParams.basePath).toBe(
      "https://api.dev.tiledb.io/v2"
    );
  });
});
