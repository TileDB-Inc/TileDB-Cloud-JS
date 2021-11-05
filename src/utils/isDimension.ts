import { Attribute, Dimension } from "../v1";

const isDimension = (data: Attribute | Dimension): data is Dimension => {
  return data.hasOwnProperty("nullTileExtent");
};

export default isDimension;
