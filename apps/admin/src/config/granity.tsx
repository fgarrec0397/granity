import { EngineConfig, GetFilesResult, WidgetModules } from "@granity/engine";
import { HomeIcon, LogoutIcon } from "@granity/ui";
import { signOut } from "next-auth/react";

import { getFiles, saveFiles } from "../services/files";
import { saveScenes } from "../services/scenes";

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
    filesManager: {
        saveFiles: async (formData: FormData) => {
            const response = await saveFiles(formData);

            if (!response.success) {
                return {
                    status: false,
                    message: response.errorMessage as string,
                };
            }

            if (response.success) {
                return {
                    status: true,
                    message: "Scenes saved with success!",
                };
            }

            return {
                status: false,
                message: "An error occured",
            };
        },
        getFiles: async (path) => {
            const files = await getFiles(path);
            return files as Promise<GetFilesResult>;
        },
    },
    onSave: async (scenes) => {
        if (scenes) {
            const response = await saveScenes(scenes);

            if (!response.success) {
                return {
                    status: false,
                    message: response.errorMessage as string,
                };
            }

            if (response.success) {
                return {
                    status: true,
                    message: "Scenes saved with success!",
                };
            }
        }

        return {
            status: false,
            message: "An error occured",
        };
    },
};
