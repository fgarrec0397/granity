import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { CheckFillIcon, ClockFillIcon, useTheme } from "@granity/ui";
import { FC, useState } from "react";

const EditorPublishedStatus: FC = () => {
    const theme = useTheme();
    const [status] = useState("pending");
    const { app } = useCore();

    if (app?.status === "pending") {
        return (
            <ClockFillIcon color1={theme.palette.error.main} color2={theme.palette.common.white} />
        );
    }

    if (app?.status === "saved") {
        return (
            <ClockFillIcon
                color1={theme.palette.warning.main}
                color2={theme.palette.common.white}
            />
        );
    }

    if (app?.status === "published") {
        return (
            <CheckFillIcon
                color1={theme.palette.success.dark}
                color2={theme.palette.common.white}
            />
        );
    }

    return null;
};

export default EditorPublishedStatus;
