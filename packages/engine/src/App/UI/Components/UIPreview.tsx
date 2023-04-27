import EditorControls from "@engine/App/Editor/components/EditorCommon/EditorControls";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import { editorPadding } from "@engine/Theme/themeConstants";
import { Paper, PaperProps, pxToRem } from "@granity/ui";
import { FC, useEffect, useState } from "react";

type UIPreviewStyles = {
    wrapper?: (display: boolean) => PaperProps;
};

const styles: UIPreviewStyles = {
    wrapper: (display) => ({
        sx: {
            ...layoutStyles({
                top: display ? editorPadding : -60,
                width: 160,
                centered: true,
            }),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: pxToRem(60),
            transition: "top .3s ease",
        },
    }),
};

const UIPreview: FC = () => {
    const [displayControls, setDisplayControls] = useState(false);

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (!displayControls && event.clientY < 20) {
                return setDisplayControls(true);
            }

            setDisplayControls(false);
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [displayControls]);

    return (
        <Paper {...styles.wrapper?.(displayControls)}>
            <EditorControls />
        </Paper>
    );
};

export default UIPreview;
