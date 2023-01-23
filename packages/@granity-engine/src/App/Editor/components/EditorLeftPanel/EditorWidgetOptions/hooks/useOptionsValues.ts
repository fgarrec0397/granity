import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetBaseOptions, WidgetOptionsValues } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { useEffect, useState } from "react";

export default () => {
    const [optionsValues, setOptionsValues] = useState<WidgetOptionsValues>();
    const { selectedWidgets, getWidgetDictionaryFromWidget, updateCurrentWidgetOptions } =
        useWidgets();

    useEffect(() => {
        const options = getWidgetDictionaryFromWidget(selectedWidgets[0]?.id)?.options;
        setOptionsValues(options);
    }, [selectedWidgets, getWidgetDictionaryFromWidget]);

    const updateOptionsValues = (value: string | number | boolean, option: WidgetBaseOptions) => {
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
