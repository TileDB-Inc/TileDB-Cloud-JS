import { V1API } from "../v1";

const isDimension = (data: V1API.Attribute | V1API.Dimension): data is V1API.Dimension => {
  return data.hasOwnProperty("nullTileExtent");
};

export default isDimension;
