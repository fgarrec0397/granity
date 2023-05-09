import { InputsConfig } from "../_actions/coreTypes";

export default {
    editor: [
        {
            name: "toggleEditor",
            event: "keyup",
            code: "KeyE",
            ctrlKey: true,
            shiftKey: true,
            preventDefault: false,
        },
        {
            name: "toggleGrid",
            event: "keyup",
            code: "KeyG",
            ctrlKey: false,
            shiftKey: true,
            preventDefault: false,
        },
        {
            name: "copyWidget",
            event: "keyup",
            code: "KeyC",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "pasteWidget",
            event: "keyup",
            code: "KeyV",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "undo",
            event: "keyup",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "cancelUndo",
            event: "keyup",
            code: "KeyZ",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "delete",
            event: "keyup",
            code: "Delete",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "nextCamera",
            event: "keyup",
            code: "ArrowRight",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "prevCamera",
            event: "keyup",
            code: "ArrowLeft",
            ctrlKey: true,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "saveApp",
            event: "keyup",
            code: "KeyS",
            ctrlKey: true,
            shiftKey: true,
        },
        {
            name: "clickTest",
            event: "mouseup",
            button: 2,
            ctrlKey: true,
            shiftKey: false,
        },
        {
            name: "jump",
            event: "drag",
            code: "Space",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
    ],
    game: [
        {
            name: "jump",
            event: "keyup",
            code: "Space",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
        {
            name: "jump",
            event: "drag",
            code: "Space",
            ctrlKey: false,
            shiftKey: false,
            preventDefault: false,
        },
    ],
} as InputsConfig;
