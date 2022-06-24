import { off, on } from "@app/Core/utilities/events";
import { useEffect } from "react";

import { useWidgetsActions } from "./_actions/hooks";

export const useHandleAddWidget = () => {
    const { addWidget } = useWidgetsActions();

    useEffect(() => {
        const handleAddWidget = ({ detail }: any) => {
            addWidget(detail);
        };

        on("addWidget", handleAddWidget);

        return () => {
            off("addWidget", handleAddWidget);
        };
    }, [addWidget]);
};

export const useHandleRemoveSelected = () => {
    const { removeSelected } = useWidgetsActions();

    useEffect(() => {
        const handleRemoveSelected = () => {
            removeSelected();
        };

        on("removeSelected", handleRemoveSelected);

        return () => {
            off("removeSelected", handleRemoveSelected);
        };
    }, [removeSelected]);
};
