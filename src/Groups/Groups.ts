import {
  Configuration,
  V1API,
} from "../v1";
import {
  GroupsApi as GroupsV2Api,
} from "../v2";
import globalAxios, { AxiosInstance } from "axios";

class Groups {
  API: V1API.GroupsApi;
  V2API: GroupsV2Api;

  constructor(
    params: Configuration,
    paramsV2: Configuration,
    axios: AxiosInstance = globalAxios
  ) {
    this.API = new V1API.GroupsApi(params, undefined, axios);
    this.V2API = new GroupsV2Api(paramsV2, undefined, axios);
  }

  public async getGroupContents(namespace: string, name: string) {
    const result = await this.API.getGroupContents(namespace, name);

    return result.data;
  }
}

export default Groups;
