import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../common/components/Html/StyledWrapper";
import EditorFeedback from "./components/EditorFeedback";
import EditorGeometryMenu from "./components/EditorGeometryMenu";
import EditorItemsList from "./components/EditorItemsList";
import EditorModeSelector from "./components/EditorModeSelector";
import SaveButton from "./components/EditorSaveButton";

interface Props {
    isEditor: boolean;
}

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

const Editor: FC<Props> = ({ isEditor }) => {
    if (isEditor) {
        return (
            <>
                <StyledWrapper {...styles.topWrapper}>
                    <EditorFeedback />
                    <EditorModeSelector />
                </StyledWrapper>
                <StyledWrapper {...styles.rightWrapper}>
                    <EditorItemsList />
                </StyledWrapper>
                <StyledWrapper {...styles.bottomWrapper}>
                    <EditorGeometryMenu />
                    <SaveButton />
                </StyledWrapper>
            </>
        );
    }
    return null;
};

export default Editor;
