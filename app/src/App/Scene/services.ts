import { SetOptionalPropertyFrom } from "../Common/utils/typings";
import { WidgetSceneObject, WidgetsDictionary } from "../Widgets/types";
import { serializeWidgets } from "./utilities/serializer";

type SaveSceneServiceParameter = {
    widgets: WidgetSceneObject[];
    widgetsDictionary: WidgetsDictionary;
};

export const saveScene = async ({ widgets, widgetsDictionary }: SaveSceneServiceParameter) => {
    const clonedWidgets: SetOptionalPropertyFrom<WidgetSceneObject, "component">[] = [...widgets];

    const serializedWidgets = serializeWidgets(clonedWidgets);

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

type FetchSuccessCallBack = (data: any) => void;

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
