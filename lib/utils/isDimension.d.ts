import { Attribute, Dimension } from "../v2";
declare const isDimension: (data: Attribute | Dimension) => data is Dimension;
export default isDimension;
