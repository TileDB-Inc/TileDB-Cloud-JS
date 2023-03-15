import { Attribute, Dimension } from "../v2";

const isDimension = (data: Attribute | Dimension): data is Dimension => {
  return data.hasOwnProperty("nullTileExtent");
};

export default isDimension;
