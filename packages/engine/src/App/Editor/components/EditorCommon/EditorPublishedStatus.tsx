import useCore from "@engine/App/Core/_actions/hooks/useCore";
import CheckFill from "@granity/icons/CheckFill";
import ClockFill from "@granity/icons/ClockFill";
import { useTheme } from "@granity/ui";
import { FC } from "react";

const EditorPublishedStatus: FC = () => {
    const theme = useTheme();
    const { app } = useCore();

    if (app?.status === "pending") {
        return <ClockFill color1={theme.palette.error.main} color2={theme.palette.common.white} />;
    }

    if (app?.status === "saved") {
        return (
            <ClockFill color1={theme.palette.warning.main} color2={theme.palette.common.white} />
        );
    }

    if (app?.status === "published") {
        return (
            <CheckFill color1={theme.palette.success.dark} color2={theme.palette.common.white} />
        );
    }

    return null;
};

export default EditorPublishedStatus;
