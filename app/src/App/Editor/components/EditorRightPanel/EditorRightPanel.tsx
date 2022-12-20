import Panel, { PanelStyles } from "@app/Common/components/Html/Panel/Panel";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { layoutStyles } from "@themes/mixins/layout";
import { pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorScenesList from "./EditorScenesList";
import EditorUIList from "./EditorUIList";
import EditorWidgetsObjectList from "./EditorWidgetsObjectList";

type EditorRightPanelStyles = {
    wrapper?: StyledWrapperProps;
    panel?: PanelStyles;
};

const styles: EditorRightPanelStyles = {
    wrapper: {
        css: css`
            width: 100%;
            max-width: ${pxToRem(275)};

            ${layoutStyles(110, 30, undefined, undefined)}
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

const EditorRightPanel: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <Panel {...styles.panel}>
                <EditorWidgetsObjectList />
            </Panel>
            <EditorUIList />
            {/* <EditorScenesList /> */}
        </StyledWrapper>
    );
};

export default EditorRightPanel;
