import { Configuration, GroupsApi } from "../v1";
import { GroupsApi as GroupsV2Api } from "../v2";
import { AxiosInstance } from "axios";
declare class Groups {
    API: GroupsApi;
    V2API: GroupsV2Api;
    constructor(params: Configuration, paramsV2: Configuration, axios?: AxiosInstance);
    getGroupContents(namespace: string, name: string): Promise<import("../v1").GroupContents>;
}
export default Groups;
