import { EngineConfig, WidgetModules } from "@granity/engine";
import Home from "@granity/icons/Home";
import Logout from "@granity/icons/Logout";
import { signOut } from "next-auth/react";

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
    physicsEnabled: true,
    editorMainMenu: [
        {
            text: "Home",
            onClick: () => (window.location.href = "/"),
            icon: <Home fontSize="small" />,
        },
        {
            text: "Logout",
            onClick: () => signOut(),
            icon: <Logout fontSize="small" />,
        },
    ],
    endpoints: {
        files: {
            save: "/server/files",
            get: "/server/files",
        },
        app: {
            get: "/server/app",
            save: "/server/app",
        },
        processes: {
            generateJsxFromGlb: "/server/processes/",
        },
    },
};
