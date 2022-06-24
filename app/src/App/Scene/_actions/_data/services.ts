import { SetOptionalPropertyFrom } from "@common/commonTypes";
import { WidgetSceneObject } from "@widgets/_actions/widgetsTypes";

import { GetSceneResponseData, SaveSceneServiceParameter } from "../sceneTypes";
import { serializer } from "../utilities";

export const saveScene = async ({ widgets, widgetsDictionary }: SaveSceneServiceParameter) => {
    const clonedWidgets: SetOptionalPropertyFrom<WidgetSceneObject, "component">[] = [...widgets];

    const serializedWidgets = serializer.serializeWidgets(clonedWidgets);

    const widgetsDefinition = { serializedWidgets, widgetsDictionary };

    const rawResponse = await fetch("api/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(widgetsDefinition),
    });

    try {
        return await rawResponse.json();
    } catch (error) {
        return console.error(error, "error");
    }
};

type FetchSuccessCallBack = (data: GetSceneResponseData) => void;

export const fetchScene = async (successCallBack: FetchSuccessCallBack) => {
    const response = await fetch("api/scene");

    try {
        const { sceneJsonString } = await response.json();

        const data = JSON.parse(sceneJsonString);

        successCallBack(data);
    } catch (error) {
        console.error(error, "error");
    }
};
