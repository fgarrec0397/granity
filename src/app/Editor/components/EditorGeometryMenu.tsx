import { Button, Card, Col, Modal, Row } from "antd";
import React, { FC, CSSProperties, useState, MouseEventHandler } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../Common/components/Html/StyledWrapper";
import useEditableProxies from "../state/hooks/useEditableProxies";
import widgets from "../../../Features/collector";

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

const gridStyle: CSSProperties = {
    width: "25%",
    textAlign: "center",
};

const EditorGeometryMenu: FC = () => {
    const { addEditableProxy } = useEditableProxies();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOnClick = (widget: any): void => {
        addEditableProxy(widget);
    };

    console.log(widgets, "widgets");

    return (
        <StyledWrapper {...styles.wrapper}>
            <Button type="dashed" onClick={showModal} style={styles.buttonsStyle}>
                + Widget
            </Button>
            <Modal title="Widgets" visible={isModalVisible} width={1000} footer={[]}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {widgets.map((widget) => (
                        <Col className="gutter-row" span={6} onClick={() => handleOnClick(widget)}>
                            {widget.widgetDefinition.name}
                        </Col>
                    ))}
                </Row>
            </Modal>
            {/* <Button
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
            </Button> */}
        </StyledWrapper>
    );
};

export default EditorGeometryMenu;
