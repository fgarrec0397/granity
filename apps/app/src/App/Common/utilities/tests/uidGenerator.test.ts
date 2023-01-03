import uidGenerator from "../uidGenerator";

const testId = uidGenerator();

describe("Testing uidGenerator", () => {
    test("uidGenerator does not return null, undefined or falsy", () => {
        expect(testId).not.toBeFalsy();
        expect(testId).not.toBeUndefined();
        expect(testId).not.toBeNull();
    });
    test("uidGenerator should return a string", () => {
        expect(testId).toBeTypeOf("string");
    });
});
