import { act, appRenderHook } from "@granity-engine/Tests/testing";
import { beforeEach, describe, expect, it } from "vitest";

import useCore from "../useCore";

describe("useCore hook", () => {
    const { result } = appRenderHook(() => useCore());

    describe("onCorePointerMissed is callable", () => {
        const canvas = document.createElement("canvas");

        const clickCallback = vi.fn((event: MouseEvent) => {
            result.current.onCorePointerMissed(event);
        });

        beforeEach(() => {
            canvas.addEventListener("click", clickCallback);
        });

        it("should be executed on click event", () => {
            act(() => {
                canvas.click();
            });

            expect(clickCallback).toBeCalled();
        });

        afterAll(() => {
            vi.restoreAllMocks();
            canvas.removeEventListener("click", clickCallback);
        });
    });
});
