const { isTypeReferenceNode, isExportDeclaration } = require("typescript");
const {
    default: attributeValuesToArrayBuffers,
  } = require("../lib/utils/attributeValuesToArrayBuffers");



  describe("attributeValuesToArrayBuffers()", () => {
      it("Should return a map of all the arrayBuffers of an attribute/dimension", () => {
        const dimensions = [
            {
              domain: null,
              filterPipeline: {},
              name: "rows",
              nullTileExtent: true,
              tileExtent: {},
              type: "STRING_ASCII",
            },
            {
              domain: {
                int32: [1, 4],
              },
              filterPipeline: {},
              name: "cols",
              nullTileExtent: false,
              tileExtent: {
                int32: 4,
              },
              type: "INT32",
            },
          ];
      
          const attributes = [
            {
              cellValNum: "1",
              filterPipeline: {},
              name: "a",
              type: "INT32",
            },
          ];
      
          const query = {
            layout: "unordered",
            values: {
              a: {
                values: [9, 12, 230],
              },
              rows: {
                values: ["a", "b", "b", "c"],
                offsets: [0, 1, 3],
              },
              cols: {
                values: [1, 4, 3],
              },
            },
          };
      
          const attrBuffers = attributeValuesToArrayBuffers(
            query.values,
            dimensions,
            attributes
          );

          expect(attrBuffers.rows.offsetsBuffer.byteLength).toEqual(24);
          expect(attrBuffers.rows.validityBuffer.byteLength).toEqual(0);
          expect(attrBuffers.rows.valuesBuffer.byteLength).toEqual(4);

          expect(attrBuffers.a.offsetsBuffer.byteLength).toEqual(0);
          expect(attrBuffers.a.validityBuffer.byteLength).toEqual(0);
          expect(attrBuffers.a.valuesBuffer.byteLength).toEqual(12);

          expect(attrBuffers.cols.offsetsBuffer.byteLength).toEqual(0);
          expect(attrBuffers.cols.validityBuffer.byteLength).toEqual(0);
          expect(attrBuffers.cols.valuesBuffer.byteLength).toEqual(12);
      })
  })