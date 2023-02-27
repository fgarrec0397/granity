import { createWidget, EditableWidget, FieldType, helpersTypes, WidgetType } from "@granity/engine";
import { capitalizeString, Vector3Array } from "@granity/helpers";
import { FC } from "react";

export type LightProps = EditableWidget & {
    lightType: string;
    intensity: number;
    direction: Vector3Array;
};

const Light: FC<LightProps> = ({ lightType, intensity, direction }, ref) => {
    if (lightType === "spotlight") {
        return (
            <spotLight
                ref={ref}
                position={[0, 0, 0]}
                intensity={intensity}
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
                intensity={intensity}
                shadow-mapSize-width={64}
                shadow-mapSize-height={64}
                castShadow
                shadow-bias={-0.001}
                target-position={direction || [0, 0, 0]}
            />
        );
    }

    return (
        <spotLight
            ref={ref}
            position={[0, 0, 0]}
            intensity={intensity}
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
            isVisible: (options) => {
                if (options?.lightType?.value === "spotLight") {
                    return false;
                }

                return true;
            },
        },
        {
            name: "direction",
            displayName: "Direction",
            fieldType: FieldType.Vector3,
            defaultValue: [0, 0, 0],
        },
    ],
});
