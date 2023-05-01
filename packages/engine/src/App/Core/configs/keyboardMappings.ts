import { KeyboardKeys } from "../_actions/coreTypes";

export default {
    editor: [
        {
            name: "toggleEditor",
            code: "KeyE",
            ctrlKey: true,
            shiftKey: true,
            preventDefault: false,
        },
        {
            name: "toggleGrid",
            code: "KeyG",
            ctrlKey: false,
            shiftKey: true,
            preventDefault: false,
        },
        {
            name: "copyWidget",
            code: "KeyC",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "pasteWidget",
            code: "KeyV",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "undo",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "cancelUndo",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "delete",
            code: "Delete",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "nextCamera",
            code: "ArrowRight",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "prevCamera",
            code: "ArrowLeft",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "saveApp",
            code: "KeyS",
            ctrlKey: true,
            shiftKey: true,
        },
    ],
    game: [
        {
            name: "jump",
            code: "Space",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
    ],
} as KeyboardKeys;
