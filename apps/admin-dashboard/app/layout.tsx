"use client";

import {
    EngineConfig,
    GranityEngineProvider,
    ScenesDictionary,
    WidgetModules,
} from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
// import { widgetsModules } from "@granity/widgets";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import AppBar from "./AppBar";
interface IProps {
    children: ReactNode;
}

let widgetsModules: WidgetModules[] = [];

function importAll(r) {
    const modules = {};
    r.keys().forEach((key) => (modules[key] = r(key)));
    console.log(modules, "modules require context");
    widgetsModules = Object.keys(modules).map((x) => modules[x].widget);
}

importAll(require.context("../../../packages/@granity-widgets/src/Widgets", true, /\.tsx$/));

console.log("after importAll");
console.log(widgetsModules, "widgets");

const postScenes = async (scenes: ScenesDictionary) => {
    const rawResponse = await fetch("/server/scene", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scenes),
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};
// console.log(widgetsModules, "widgetsModules");

const config: EngineConfig = {
    widgetsModules,
    onSave: async (scenes) => {
        if (scenes) {
            const response = await postScenes(scenes);

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

const queryClient = new QueryClient();

export default function RootLayout({ children }: IProps) {
    return (
        <html lang="en">
            <body>
                <SessionProvider>
                    <QueryClientProvider client={queryClient}>
                        <GranityEngineProvider config={config}>
                            <AppBar />
                            <div className={"  h-screen "}>{children}</div>
                        </GranityEngineProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
