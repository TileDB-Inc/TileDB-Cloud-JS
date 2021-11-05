import MockAttributeBufferHeader from "../__mocks__/MockAttributeBufferHeader";
import getSizeInBytesOfAllAttributes from "./getSizeInBytesOfAllAttributes";



describe('getSizeInBytesOfAllAttributes()', () => {
    it('Should return total buffer size of all attribute buffer headers', () => {
        const attrs = [
            MockAttributeBufferHeader(6, 24, 3),
            MockAttributeBufferHeader(32, 12, 8),
            MockAttributeBufferHeader(12, 32, 4),
        ];
        const result = getSizeInBytesOfAllAttributes(attrs);

        expect(result).toEqual(133);
    })
});