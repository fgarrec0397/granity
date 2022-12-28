import { StyledWrapper } from "@app/Common/components/Html";
import Button from "@app/Common/components/Html/Button/Button";
import { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { FC } from "react";
import { css } from "styled-components";

type UIClosePreviewButtonStyles = {
    wrapper?: StyledWrapperProps;
};

const styles: UIClosePreviewButtonStyles = {
    wrapper: {
        css: css`
            position: absolute;
            bottom: 3em;
            left: 50%;
            transform: translateX(-50%);
        `,
    },
};

const UIClosePreviewButton: FC = () => {
    const { closeEditorUIPreview } = useEditor();

    const onClickHandler = () => {
        closeEditorUIPreview();
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Button onClick={onClickHandler}>Close UI Preview</Button>
        </StyledWrapper>
    );
};

export default UIClosePreviewButton;
