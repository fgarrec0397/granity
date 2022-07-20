import { useCallback, useEffect } from "react";

import { rawWidgetsModules } from "../../widgetsImports";
import { FieldType, WidgetModule } from "../widgetsTypes";
import useWidgetsModules from "./useWidgetsModules";

export default () => {
    const { setWidgetsModules } = useWidgetsModules();

    const initWidgetsModules = useCallback(
        (widgets: WidgetModule[]) => {
            setWidgetsModules(widgets);
        },
        [setWidgetsModules]
    );

    useEffect(() => {
        console.log(rawWidgetsModules, "rawWidgetsModules");

        const rawWidgetsModulesWithPhysic = rawWidgetsModules.map((module) => {
            if (module.widgetDefinition.hasPhysic) {
                module.widgetDefinition.physic = [
                    {
                        name: "mass",
                        displayName: "Mass",
                        fieldType: FieldType.Number,
                        defaultValue: 1,
                    },
                    {
                        name: "type",
                        displayName: "Type",
                        fieldType: FieldType.Select,
                        selectOptions: [
                            {
                                value: "Dynamic",
                                name: "Dynamic",
                            },
                            {
                                value: "Static",
                                name: "Static",
                            },
                            {
                                value: "Kinematic",
                                name: "Kinematic",
                            },
                        ],
                        defaultValue: "Dynamic",
                    },
                ];
            }

            return module;
        });

        initWidgetsModules(rawWidgetsModulesWithPhysic);
    }, [initWidgetsModules]);
};
