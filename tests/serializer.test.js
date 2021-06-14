const serializer = require("../lib/utils/capnpSerializer");

test("serializer", () => {
    const data = {"entries":[{"key":"file_size","type":"INT64","valueNum":1,"value":[248,14,0,0,0,0,0,0],"del":false},{"key":"format","type":"STRING_UTF8","valueNum":4,"value":[106,115,111,110],"del":false},{"key":"type","type":"STRING_UTF8","valueNum":8,"value":[110,111,116,101,98,111,111,107],"del":false}]};
  expect(serializer.default(data)).toBe("fdsafsafda");
});
