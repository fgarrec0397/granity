import { Button } from "antd";
import React, { FC } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../../common/components/Html/StyledWrapper";
import useEditableProxies from "../state/hooks/useEditableProxies";

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
    buttonsStyle?: React.CSSProperties;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            margin-right: 0.5em;
            max-width: 300px;
            user-select: none;
        `,
    },
    buttonsStyle: {
        marginRight: "0.25em",
    },
};

const EditorGeometryMenu: FC = () => {
    const { addEditableProxy } = useEditableProxies();

    const handleOnClick = (type: string): void => {
        addEditableProxy(type);
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Button
                type="dashed"
                onClick={() => handleOnClick("BoxGeometry")}
                style={styles.buttonsStyle}
            >
                + Cube
            </Button>
            <Button
                type="dashed"
                onClick={() => handleOnClick("plane")}
                style={styles.buttonsStyle}
            >
                + Plane
            </Button>
        </StyledWrapper>
    );
};

export default EditorGeometryMenu;
