import MockAttributeBufferHeader from "../__mocks__/MockAttributeBufferHeader"
import getAttributeSizeInBytes from "./getAttributeSizeInBytes"


describe('getAttributeSizeInBytes()', () => {
    it('Should return total size of buffer size of an attribute', () => {
        const attr = MockAttributeBufferHeader(6, 24, 3)
        const result = getAttributeSizeInBytes(attr);

        expect(result).toEqual(33);
    })
})