import { createWidget, EditableWidget, FieldType, HelpersTypes, WidgetType } from "@granity/engine";
import { FC } from "react";

export type LightProps = EditableWidget & {
    lightType: string;
    intensity: number;
};

const Light: FC<LightProps> = ({ lightType, intensity }) => {
    const LightComponent: any = lightType;

    return <LightComponent intensity={intensity} />;
};

export const widget = createWidget<LightProps>({
    component: Light,
    hasRef: true,
    reducer: null,
    type: WidgetType.GameObject,
    editorOptions: {
        helper: (options) => {
            return HelpersTypes.PointLightHelper;
        },
        meshHolder: (
            <mesh scale={[0.25, 0.25, 0.25]}>
                <boxGeometry />
                <meshBasicMaterial visible={false} />
            </mesh>
        ),
    },
    name: "Light",
    options: [
        {
            name: "lightType",
            displayName: "Light Type",
            fieldType: FieldType.Select,
            selectOptions: [
                {
                    value: "ambientLight",
                    name: "Ambient",
                },
                {
                    value: "directionalLight",
                    name: "Directional",
                },
                {
                    value: "spotLight",
                    name: "Spot Light",
                },
            ],
            defaultValue: "ambientLight",
        },
        {
            name: "intensity",
            displayName: "Intensity",
            fieldType: FieldType.Number,
            defaultValue: 0,
        },
    ],
});
