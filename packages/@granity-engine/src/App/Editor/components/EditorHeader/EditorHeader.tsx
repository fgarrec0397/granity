import { Icons, StyledWrapper, StyledWrapperProps } from "@granity/ui";
import { layoutStyles } from "@granity-engine/Themes/mixins/layout";
import { getCommon, pxToRem } from "@granity-engine/Themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorPlayButton, { EditorPlayButtonProps } from "./EditorPlayButton";
import EditorPreviewUIButton, { EditorPreviewUIButtonProps } from "./EditorPreviewUIButton";

type EditorStyles = {
    wrapper?: StyledWrapperProps;
    leftSection?: StyledWrapperProps;
    centerSection?: StyledWrapperProps;
    rightSection?: StyledWrapperProps;
    uiPreviewButton?: EditorPreviewUIButtonProps;
    playButton?: EditorPlayButtonProps;
};

const styles: EditorStyles = {
    wrapper: {
        css: css`
            ${layoutStyles(
                {
                    top: 0,
                    right: 0,
                    left: 0,
                },
                false
            )}
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${pxToRem(10, 30)};
            backdrop-filter: blur(${getCommon("blur.heavy")});
        `,
    },
    centerSection: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    leftSection: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    playButton: {
        styles: {
            button: {
                css: css`
                    margin-left: ${pxToRem(25)};
                `,
            },
        },
    },
};

const EditorHeader: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <StyledWrapper {...styles.leftSection}>
                <Icons.GranityLogo />
            </StyledWrapper>
            <StyledWrapper {...styles.centerSection}>
                <EditorPreviewUIButton {...styles.uiPreviewButton} />
                <EditorPlayButton {...styles.playButton} />
            </StyledWrapper>
            <StyledWrapper {...styles.rightSection}>Menu</StyledWrapper>
        </StyledWrapper>
    );
};

export default EditorHeader;
