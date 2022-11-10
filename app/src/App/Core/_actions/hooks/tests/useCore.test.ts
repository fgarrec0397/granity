import { render, renderHook } from "@testing-library/react";
// import { renderHook } from "@testing-library/react-hooks";
import { appRender, appRenderHook, TestAppProviders } from "@tests/test-utils"; // Need to investigate why the tester cant load the file
import { beforeEach, describe, expect, it } from "vitest";

import useCore from "../useCore";

describe("useCore hook", () => {
    const { result } = renderHook(() => useCore(), { wrapper: TestAppProviders });

    describe("onCorePointerMissed function", () => {
        const canvas = document.createElement("canvas");

        const clickCallback = vi.fn((event: MouseEvent) => {
            result.current.onCorePointerMissed(event);
        });

        beforeEach(() => {
            canvas.addEventListener("click", clickCallback);
        });

        it("should be executed on click event", () => {
            canvas.click();

            expect(clickCallback).toBeCalled();
        });

        afterAll(() => {
            vi.restoreAllMocks();
            canvas.removeEventListener("click", clickCallback);
        });
    });
});
