import enumerationToHumanReadable from './enumerationToHumanReadable';

describe('enumerationToHumanReadable()', () => {
  it('Should return human readable data', async () => {
    const enumeration = {
      name: 'colors',
      pathName: '__6858267a2e83440ebe097085aa243eb3_0',
      type: 'STRING_ASCII',
      cellValNum: 4294967295,
      ordered: false,
      data: [114, 101, 100, 103, 114, 101, 101, 110, 98, 108, 117, 101],
      offsets: [
        0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0
      ]
    };
    const result = await enumerationToHumanReadable(enumeration);
    const expected = {
      name: 'colors',
      type: 'STRING_ASCII',
      values: ['red', 'green', 'blue']
    };

    expect(result).toEqual(expected);
  });
});
