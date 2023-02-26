import { Vector3Input, Vector3InputProps } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

type Props = Vector3InputProps;

const EditorWidgetPropertyFields: FC<Props> = ({ title, value }) => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return <Vector3Input title={title} value={value} />;
    }

    return null;
};

export default EditorWidgetPropertyFields;
