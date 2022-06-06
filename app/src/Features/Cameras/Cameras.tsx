import { FC } from "react";
import useIsEditor from "../../App/Editor/state/hooks/useIsEditor";
import { EditableWidget } from "../../App/Editor/types";
import { WidgetModule } from "../../App/Widgets/types";

export type CamerasProps = EditableWidget;

type OwnProps = CamerasProps;

const Cameras: FC<OwnProps> = () => {
    const { isEditor } = useIsEditor();

    return <></>;
};

export const widget: WidgetModule<CamerasProps> = {
    component: Cameras,
    reducer: null,
    widgetDefinition: {
        name: "Player",
    },
};
