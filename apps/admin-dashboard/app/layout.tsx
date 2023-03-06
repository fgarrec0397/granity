"use client";
import "styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AppBar from "./AppBar";
import { EngineConfig, GranityEngineProvider, ScenesDictionary } from "@granity/engine";
import { QueryClient, QueryClientProvider } from "@granity/helpers";
import { widgetsModules } from "@granity/widgets";
interface IProps {
  children: ReactNode;
}

export const postScenes = async (scenes: ScenesDictionary) => {
  const rawResponse = await fetch("api/scene", {
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
