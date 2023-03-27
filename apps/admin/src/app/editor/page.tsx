"use client";
import { GranityEngine, useScenes } from "@granity/engine";
import { useQuery } from "@granity/helpers";
import { Box, useSnackbar } from "@granity/ui";
import { useEffect } from "react";
import useSWR from "swr"; // TODO replace useQuery by useSWR

const getScenes = async () => {
    const response = await fetch("/server/scene");

    if (!response.ok) {
        throw new Error("No connection");
    }

    return response.json();
};

const EditorPage = () => {
    const { initScenes, setScenesLoading } = useScenes();
    const { enqueueSnackbar } = useSnackbar();

    const { data, status, isLoading } = useQuery({
        queryKey: ["scenes"],
        queryFn: () => getScenes(),
    });

    useEffect(() => {
        setScenesLoading(isLoading);
    }, [setScenesLoading, isLoading]);

    useEffect(() => {
        if (status === "error") {
            enqueueSnackbar("No connections", { variant: "error" });
        }

        if (status === "success") {
            try {
                const { sceneJsonString } = data;

                if (!sceneJsonString) {
                    enqueueSnackbar("No scenes found", { variant: "warning" });
                    return;
                }

                const scenes = JSON.parse(sceneJsonString);

                initScenes(scenes);
            } catch (errorParsing) {
                if (typeof errorParsing === "string") {
                    enqueueSnackbar(errorParsing, { variant: "error" });
                } else {
                    // eslint-disable-next-line no-console
                    console.error(errorParsing);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <Box
            sx={{
                "& > div:first-child": {
                    minHeight: "100vh",
                    "& > div": {
                        minHeight: "100vh",
                    },
                },
            }}
        >
            <GranityEngine />
        </Box>
    );
};

export default EditorPage;
