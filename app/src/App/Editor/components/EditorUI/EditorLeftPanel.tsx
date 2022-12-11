import Panel, { PanelStyles } from "@app/Common/components/Html/Panel/Panel";
import { FC } from "react";
import { css } from "styled-components";

import EditorModeSelector from "./EditorModeSelector";

type EditorLeftPanelStyles = {
    panelStyles: PanelStyles;
};

const styles: EditorLeftPanelStyles = {
    panelStyles: {
        wrapper: {
            css: css`
                position: absolute;
                top: 1em;
                left: 1em;
                display: flex;
                align-items: flex-start;
                user-select: none;
            `,
        },
    },
};

const EditorLeftPanel: FC = () => {
    return (
        <Panel {...styles.panelStyles}>
            <EditorModeSelector />
        </Panel>
    );
};

export default EditorLeftPanel;
