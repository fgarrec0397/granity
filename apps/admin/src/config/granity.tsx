import { EngineConfig, WidgetModules } from "@granity/engine";
import { HomeIcon, LogoutIcon } from "@granity/ui";
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
    editorMainMenu: [
        {
            text: "Home",
            onClick: () => (window.location.href = "/"),
            icon: <HomeIcon fontSize="small" />,
        },
        {
            text: "Logout",
            onClick: () => signOut(),
            icon: <LogoutIcon fontSize="small" />,
        },
    ],
    endpoints: {
        files: {
            save: "/server/files",
            get: "/server/files",
        },
        scenes: {
            get: "/server/scenes",
            save: "/server/scenes",
        },
    },
};
