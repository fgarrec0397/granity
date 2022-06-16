import { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../Common/components/Html/StyledWrapper";
import EditorFeedback from "./components/EditorFeedback";
import EditorItemsList from "./components/EditorItemsList";
import EditorModeSelector from "./components/EditorModeSelector";
import SaveButton from "./components/EditorSaveButton";
import EditorGeometryMenu from "./components/EditorWidgetsMenu";
import useIsEditor from "./hooks/useIsEditor";

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

const Editor: FC = () => {
    const { isEditor } = useIsEditor();

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
                {/* <StyledWrapper {...styles.rightWrapper}>
                    <ScenePreview />
                </StyledWrapper> */}
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
