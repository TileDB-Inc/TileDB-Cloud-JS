import { Attribute, Dimension } from "../v1";
declare const isDimension: (data: Attribute | Dimension) => data is Dimension;
export default isDimension;
