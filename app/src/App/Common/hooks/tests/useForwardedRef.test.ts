import { renderHook } from "@testing-library/react-hooks";
import { ForwardedRef, MutableRefObject } from "react";
import { describe, expect, it } from "vitest";

import useForwardedRef from "../useForwardedRef";

describe("useForwardedRef hook", () => {
    it("should match an object of type MutableRefObject that contains a current property", () => {
        const forwardedRef: ForwardedRef<any> = () => {};
        const { result } = renderHook(() => useForwardedRef(forwardedRef));

        const ref: MutableRefObject<any> = {
            current: null,
        };

        expect(result.current).toMatchObject(ref);
    });
});
