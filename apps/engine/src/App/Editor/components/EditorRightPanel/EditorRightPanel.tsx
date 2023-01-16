import {
    layoutStyles,
    Panel,
    PanelStylesProps,
    pxToRem,
    StyledWrapper,
    StyledWrapperProps,
} from "@granity/ui";
import { FC } from "react";
import { css } from "styled-components";

import EditorScenesList from "./EditorScenesList";
import EditorWidgetsObjectList from "./EditorWidgetsObjectList";
import EditorWidgetsUIList from "./EditorWidgetsUIList";

type EditorRightPanelStyles = {
    wrapper?: StyledWrapperProps;
    panel?: PanelStylesProps;
};

const styles: EditorRightPanelStyles = {
    wrapper: {
        css: css`
            width: 100%;
            max-width: ${pxToRem(275)};

            ${layoutStyles({ top: 110, right: 30 })}
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
            <Panel {...styles.panel}>
                <EditorWidgetsUIList />
            </Panel>
            <Panel {...styles.panel}>
                <EditorScenesList />
            </Panel>
        </StyledWrapper>
    );
};

export default EditorRightPanel;
