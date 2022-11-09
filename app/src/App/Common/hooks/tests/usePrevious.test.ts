import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";
import { describe, expect, it } from "vitest";

import usePrevious from "../usePrevious";

const useCounterForTest = () => {
    const [count, setCount] = useState(0);
    const increment = useCallback(() => setCount((x) => x + 1), []);

    return { count, increment };
};

describe("usePrevious hook", () => {
    it("should return the same type of the given value", () => {
        const renderedUseCounterForTest = renderHook(() => useCounterForTest());

        act(() => {
            renderedUseCounterForTest.result.current.increment();
        });

        const renderedUsePrevious = renderHook(() =>
            usePrevious(renderedUseCounterForTest.result.current.count)
        );

        renderedUsePrevious.rerender();

        expect(typeof renderedUsePrevious.result.current).toBe("number");
    });
    it("should return the previous value of the given useState", () => {
        const renderedUseCounterForTest = renderHook(() => useCounterForTest());
        const renderedUsePrevious = renderHook(() =>
            usePrevious(renderedUseCounterForTest.result.current.count)
        );

        renderedUsePrevious.rerender();

        act(() => {
            renderedUseCounterForTest.result.current.increment();
        });

        expect(renderedUsePrevious.result.current).toBe(
            renderedUseCounterForTest.result.current.count - 1
        );
    });
});
