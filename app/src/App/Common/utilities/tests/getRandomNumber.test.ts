import { describe, test } from "vitest";

import getRandomNumber from "../getRandomNumber";

describe("Create a random number based on a minimum and a maximum value", () => {
    const min = 1;
    const max = 10;

    test("Number returned is not larger than the maximum", () => {
        expect(getRandomNumber(min, max)).toBeLessThan(max);
    });

    test("Number returned is not lower than the maximum", () => {
        expect(getRandomNumber(min, max)).toBeGreaterThan(min);
    });
});
