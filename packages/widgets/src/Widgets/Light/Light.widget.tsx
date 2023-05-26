import { createGameWidget, FieldType, GameEditableWidget, helpersTypes } from "@granity/engine";
import { capitalizeString, Vector3Array } from "@granity/helpers";
import { FC } from "react";

export type LightProps = GameEditableWidget & {
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

export const widget = createGameWidget<LightProps>({
    component: Light,
    hasRef: true,
    reducer: null,
    editorOptions: {
        helper: (options) => {
            if (options?.lightType?.value) {
                const capitalized = capitalizeString(options?.lightType?.value);
                const helperTypesIndex = `${capitalized}Helper`;

                return helpersTypes[helperTypesIndex];
            }

            return helpersTypes.DirectionalLightHelper;
        },
        gizmo: true,
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
            defaultValue: 1,
        },
        {
            name: "direction",
            displayName: "Direction",
            fieldType: FieldType.Vector3,
            defaultValue: [0, 0, 0],
        },
    ],
});
