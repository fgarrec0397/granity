import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { FC } from "react";
import { css } from "styled-components";

import EditorGameUIPreviewButton from "./EditorGameUIPreviewButton";
import EditorScenesList from "./EditorScenesList";
import {
    EditorItemsList,
    EditorLeftPanel,
    EditorModeSelector,
    EditorSaveButton,
    EditorWidgetsMenu,
} from "./index";

interface EditorStyles {
    topWrapper?: StyledWrapperProps;
    rightWrapper?: StyledWrapperProps;
    bottomWrapper?: StyledWrapperProps;
}

const styles: EditorStyles = {
    topWrapper: {
        css: css`
            position: absolute;
            top: 1em;
            left: 1em;
            display: flex;
            align-items: flex-start;
            user-select: none;
        `,
    },
    rightWrapper: {
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
    bottomWrapper: {
        css: css`
            position: absolute;
            bottom: 1em;
            left: 1em;
            display: flex;
            align-items: flex-start;
            user-select: none;
        `,
    },
};

const EditorUI: FC = () => {
    return (
        <>
            <StyledWrapper {...styles.topWrapper}>
                <EditorLeftPanel />
                <EditorModeSelector />
            </StyledWrapper>
            <StyledWrapper {...styles.rightWrapper}>
                <EditorItemsList />
                <EditorScenesList />
            </StyledWrapper>
            <StyledWrapper {...styles.bottomWrapper}>
                <EditorWidgetsMenu />
                <EditorGameUIPreviewButton />
                <EditorSaveButton />
            </StyledWrapper>
        </>
    );
};

export default EditorUI;
