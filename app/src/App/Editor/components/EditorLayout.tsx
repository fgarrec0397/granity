import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { FC } from "react";
import { css } from "styled-components";

import EditorGameUIPreviewButton from "./EditorHeader/EditorGameUIPreviewButton";
import EditorScenesList from "./EditorRightPanel/EditorScenesList";
import EditorUIList from "./EditorRightPanel/EditorUIList";
import { EditorItemsList, EditorLeftPanel, EditorSaveButton, EditorWidgetsMenu } from "./index";

interface EditorStyles {
    rightWrapper?: StyledWrapperProps;
    bottomWrapper?: StyledWrapperProps;
}

const styles: EditorStyles = {
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
            <EditorLeftPanel />
            <StyledWrapper {...styles.rightWrapper}>
                <EditorItemsList />
                <EditorUIList />
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
