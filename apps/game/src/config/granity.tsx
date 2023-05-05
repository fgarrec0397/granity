import { EngineConfig, WidgetModules } from "@granity/engine";

let widgetsModules: WidgetModules[] = [];

const importWidgetsModules = (requireContext: any) => {
    const modules = {};
    requireContext.keys().forEach((key: string) => ((modules as any)[key] = requireContext(key)));
    widgetsModules = Object.keys(modules).map((x) => (modules as any)[x].widget);
};

importWidgetsModules(
    require.context("../../../../packages/widgets/src/Widgets", true, /\.widget\.tsx$/)
);

export const granityConfig: EngineConfig = {
    widgetsModules,
    endpoints: {
        app: {
            get: "/server/app",
            save: "/server/app",
        },
    },
};
