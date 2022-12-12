import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { FC } from "react";
import { css } from "styled-components";

import EditorScenesList from "./EditorScenesList";
import EditorUIList from "./EditorUIList";
import EditorWidgetsObjectList from "./EditorWidgetsObjectList";

type EditorRightPanelStyles = {
    wrapper?: StyledWrapperProps;
};

const styles: EditorRightPanelStyles = {
    wrapper: {
        css: css`
            position: absolute;
            top: 1em;
            right: 1em;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            user-select: none;
        `,
    },
};

const EditorRightPanel: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <EditorWidgetsObjectList />
            <EditorUIList />
            <EditorScenesList />
        </StyledWrapper>
    );
};

export default EditorRightPanel;
