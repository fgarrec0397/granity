import { createWidget, EditableWidget, FieldType, helpersTypes, WidgetType } from "@granity/engine";
import { capitalizeString } from "@granity/helpers";
import { FC } from "react";

export type LightProps = EditableWidget & {
    lightType: string;
    intensity: number;
};

const Light: FC<LightProps> = ({ lightType, intensity, rotation }, ref) => {
    if (lightType === "spotlight") {
        return (
            <spotLight
                ref={ref}
                position={[0, 0, 0]}
                intensity={0.2}
                shadow-mapSize-width={64}
                shadow-mapSize-height={64}
                castShadow
                shadow-bias={-0.001}
            />
        );
    }

    if (lightType === "directionalLight") {
        return (
            <directionalLight
                ref={ref}
                position={[0, 0, 0]}
                intensity={0.2}
                shadow-mapSize-width={64}
                shadow-mapSize-height={64}
                castShadow
                shadow-bias={-0.001}
            />
        );
    }

    return (
        <spotLight
            ref={ref}
            position={[0, 0, 0]}
            intensity={0.2}
            shadow-mapSize-width={64}
            shadow-mapSize-height={64}
            castShadow
            shadow-bias={-0.001}
        />
    );
};

export const widget = createWidget<LightProps>({
    component: Light,
    hasRef: true,
    reducer: null,
    type: WidgetType.GameObject,
    editorOptions: {
        helper: (options) => {
            if (options?.lightType?.value) {
                const capitalized = capitalizeString(options?.lightType?.value);
                const helperTypesIndex = `${capitalized}Helper`;

                return helpersTypes[helperTypesIndex];
            }

            return helpersTypes.DirectionalLightHelper;
        },
        gizmo: (
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
            defaultValue: "spotLight",
        },
        {
            name: "intensity",
            displayName: "Intensity",
            fieldType: FieldType.Number,
            defaultValue: 0,
        },
    ],
});
