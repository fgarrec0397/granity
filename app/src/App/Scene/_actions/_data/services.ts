import { SetOptionalPropertyFrom } from "@common/commonTypes";
import { WidgetObjects } from "@widgets/_actions/widgetsTypes";

import { SaveSceneServiceParameter, SceneApiResponseResult } from "../sceneTypes";
import { serializer } from "../utilities";

export const saveScene = async ({ widgets, widgetsDictionary }: SaveSceneServiceParameter) => {
    const clonedWidgets: SetOptionalPropertyFrom<WidgetObjects, "component"> = {
        ...widgets,
    };

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

type FetchSuccessCallBack = (data: SceneApiResponseResult) => void;

export const fetchScene = async (successCallBack: FetchSuccessCallBack) => {
    const response = await fetch("api/scene");

    try {
        const { sceneJsonString } = await response.json();

        const data = JSON.parse(sceneJsonString) as SceneApiResponseResult;

        successCallBack(data);
    } catch (error) {
        console.error(error, "error");
    }
};
