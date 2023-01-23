import { appRenderHook } from "@granity-engine/Tests/testing";
import { act } from "react-dom/test-utils";
import { describe, it } from "vitest";

import { ClientKeyMappings } from "../../coreTypes";
import useKeyboardMapping from "../useKeyboardMapping";

describe("useKeyboardMapping hook", () => {
    let toogleEditorTriggered = false;

    const keyboardCallback = vi.fn((keyMapping: ClientKeyMappings) => {
        if (keyMapping.toggleEditor) {
            toogleEditorTriggered = true;
        }
    });

    appRenderHook(() => useKeyboardMapping(keyboardCallback, []));

    it("should trigger the toogleEditor action", () => {
        act(() => {
            window.dispatchEvent(
                new KeyboardEvent("keyup", { code: "KeyE", ctrlKey: true, shiftKey: true })
            );
        });

        expect(toogleEditorTriggered).toBe(true);
    });

    // TODO test dependencies
});
