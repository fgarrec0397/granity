import { StyledWrapper } from "@app/Common/components/Html";
import GranityLogo from "@app/Common/components/Html/Icons/GranityLogo";
import { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { layoutStyles } from "@themes/mixins/layout";
import { pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorPlayButton from "./EditorPlayButton";

type EditorStyles = {
    wrapper?: StyledWrapperProps;
    leftSection?: StyledWrapperProps;
    centerSection?: StyledWrapperProps;
    rightSection?: StyledWrapperProps;
};

const styles: EditorStyles = {
    wrapper: {
        css: css`
            ${layoutStyles(0, 0, undefined, 0)}
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: ${pxToRem(15, 30)};
            backdrop-filter: blur(50px);
        `,
    },
    leftSection: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
};

const EditorHeader: FC = () => {
    return (
        <StyledWrapper {...styles.wrapper}>
            <StyledWrapper {...styles.leftSection}>
                <GranityLogo />
            </StyledWrapper>
            <StyledWrapper {...styles.centerSection}>
                <EditorPlayButton />
            </StyledWrapper>
            <StyledWrapper {...styles.rightSection}>Menu</StyledWrapper>
        </StyledWrapper>
    );
};

export default EditorHeader;
