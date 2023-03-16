import { KeyboardKeys, KeyboardKeysItem } from "../coreTypes";

export default (keyboardMappingBase: KeyboardKeys, keyboardMappingOverride: KeyboardKeys) => {
    let overridedMappings: KeyboardKeys = {};

    for (const key in keyboardMappingBase) {
        const keyboard = keyboardMappingBase[key];
        const newKeyboard: KeyboardKeysItem[] = [];

        keyboard.forEach((element) => {
            const newConfigKeyboard = keyboardMappingOverride[key];
            const matchingConfigKeyboardIndex = newConfigKeyboard.findIndex(
                (x) => x.name === element.name
            );

            if (matchingConfigKeyboardIndex !== -1) {
                newKeyboard.push(newConfigKeyboard[matchingConfigKeyboardIndex]);
            } else {
                newKeyboard.push(element);
            }
        });

        overridedMappings = {
            ...overridedMappings,
            [key]: newKeyboard,
        };
    }

    return overridedMappings;
};
