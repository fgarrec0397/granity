import { useWidgets } from "@app/Widgets/_actions/hooks";
import { WidgetBaseOptions, WidgetOptionsValues } from "@app/Widgets/_actions/widgetsTypes";
import { useEffect, useState } from "react";

export default () => {
    const [optionsValues, setOptionsValues] = useState<WidgetOptionsValues>();
    const { currentWidgets, getWidgetDictionaryFromWidget, updateCurrentWidgetOptions } =
        useWidgets();

    useEffect(() => {
        const options = getWidgetDictionaryFromWidget(currentWidgets[0]?.id)?.options;
        setOptionsValues(options);
    }, [currentWidgets, getWidgetDictionaryFromWidget]);

    const updateOptionsValues = (value: string | number, option: WidgetBaseOptions) => {
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
