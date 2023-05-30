import { GameWidgetOptionsValues, WidgetOptions } from "@engine/App/Game/_actions/gameTypes";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import { useEffect, useState } from "react";

export default () => {
    const [optionsValues, setOptionsValues] = useState<GameWidgetOptionsValues<any>>();
    const { selectedGameWidgets, getGameWidgetInfoFromWidget, updateCurrentGameWidgetOptions } =
        useGameWidgets();

    useEffect(() => {
        const options = getGameWidgetInfoFromWidget(selectedGameWidgets[0]?.id)?.options;

        setOptionsValues(options);
    }, [selectedGameWidgets, getGameWidgetInfoFromWidget]);

    const updateOptionsValues = <TValue = string>(value: TValue, option: WidgetOptions) => {
        setOptionsValues({
            ...optionsValues,
            [option.name]: {
                fieldType: option.fieldType,
                value,
            },
        });

        updateCurrentGameWidgetOptions({
            [option.name]: {
                fieldType: option.fieldType,
                value: value,
            },
        });
    };

    return { optionsValues, updateOptionsValues };
};
