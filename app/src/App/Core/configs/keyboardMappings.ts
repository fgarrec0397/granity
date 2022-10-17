import { KeyboardKeys } from "../coreTypes";

export default {
    editor: [
        {
            name: "toggleEditor",
            code: "KeyE",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "copyWidget",
            code: "KeyC",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "pasteWidget",
            code: "KeyV",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "undo",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "cancelUndo",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "deleteWidget",
            code: "Delete",
            ctrlKey: false,
            shiftKey: false,
        },
        {
            name: "nextCamera",
            code: "ArrowRight",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "prevCamera",
            code: "ArrowLeft",
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "saveScene",
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
        },
    ],
} as KeyboardKeys;
