import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetOptions, WidgetOptionsValues } from "@engine/App/Widgets/_actions/widgetsTypes";
import { useEffect, useState } from "react";

export default () => {
    const [optionsValues, setOptionsValues] = useState<WidgetOptionsValues<any>>(); // TODO fix this any
    const { selectedWidgets, getWidgetDictionaryFromWidget, updateCurrentWidgetOptions } =
        useWidgets();

    useEffect(() => {
        const options = getWidgetDictionaryFromWidget(selectedWidgets[0]?.id)?.options;

        setOptionsValues(options);
    }, [selectedWidgets, getWidgetDictionaryFromWidget]);

    const updateOptionsValues = <TValue = string>(value: TValue, option: WidgetOptions) => {
        setOptionsValues({
            ...optionsValues,
            [option.name]: {
                fieldType: option.fieldType,
                value,
            },
        });

        updateCurrentWidgetOptions({
            [option.name]: {
                fieldType: option.fieldType,
                value: value,
            },
        });
    };

    return { optionsValues, updateOptionsValues };
};
