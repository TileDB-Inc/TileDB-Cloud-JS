declare const capnpArrayDeserializer: (buffer: ArrayBuffer) => {
    endTimestamp: number;
    queryType: string;
    uri: string;
    startTimestamp: number;
};
export default capnpArrayDeserializer;
