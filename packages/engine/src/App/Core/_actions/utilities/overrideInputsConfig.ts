import { InputsConfig, InputsConfigAppItem } from "../coreTypes";

export default (baseInputsConfig: InputsConfig, inputsConfigOverride: InputsConfig) => {
    let overridedInputs: InputsConfig = {};

    for (const key in baseInputsConfig) {
        const inputsApp = baseInputsConfig[key];
        const newInputs: InputsConfigAppItem[] = [];

        inputsApp.forEach((element) => {
            const newInputsApp = inputsConfigOverride[key];
            const matchingInputsConfigIndex = newInputsApp.findIndex(
                (x) => x.name === element.name
            );

            if (matchingInputsConfigIndex !== -1) {
                newInputs.push(newInputsApp[matchingInputsConfigIndex]);
            } else {
                newInputs.push(element);
            }
        });

        overridedInputs = {
            ...overridedInputs,
            [key]: newInputs,
        };
    }

    return overridedInputs;
};
