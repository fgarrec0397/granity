import { StyledWrapper } from "@app/Common/components/Html";
import Panel, { PanelStyles } from "@app/Common/components/Html/Panel/Panel";
import { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { layoutStyles } from "@themes/mixins/layout";
import { pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorModeSelector from "./EditorModeSelector";
import EditorSelectedWidget from "./EditorSelectedWidget";

type EditorLeftPanelStyles = {
    wrapper: StyledWrapperProps;
    panel: PanelStyles;
};

const styles: EditorLeftPanelStyles = {
    wrapper: {
        css: css`
            width: 100%;
            max-width: ${pxToRem(300)};

            ${layoutStyles(110, undefined, undefined, 30)}
        `,
    },
    panel: {
        wrapper: {
            css: css`
                margin-bottom: ${pxToRem(15)};

                &:last-child {
                    margin-bottom: 0;
                }
            `,
        },
    },
};

const EditorLeftPanel: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <Panel {...styles.panel}>
                <EditorSelectedWidget />
            </Panel>
            <Panel {...styles.panel}>
                <EditorModeSelector />
            </Panel>
        </StyledWrapper>
    );
};

export default EditorLeftPanel;
