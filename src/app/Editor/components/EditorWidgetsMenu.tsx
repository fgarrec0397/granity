import { Button, Col, Modal, Row } from "antd";
import React, { FC, StrictMode, useState } from "react";
import { css } from "styled-components";
import StyledWrapper, { StyledWrapperProps } from "../../Common/components/Html/StyledWrapper";
import widgets from "../../../Features/collector";
import useWidgets from "../state/hooks/useWidgets";
import { IWidget } from "../../Widgets/types";

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
    const { addWidget } = useWidgets();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOnClick = (widget: IWidget): void => {
        addWidget(widget);
        closeModalHandler();
    };

    const openModalHandler = () => {
        setIsModalVisible(true);
    };

    const closeModalHandler = () => {
        setIsModalVisible(false);
    };

    return (
        <StrictMode>
            <StyledWrapper {...styles.wrapper}>
                <Button type="dashed" onClick={openModalHandler} style={styles.buttonsStyle}>
                    + Widget
                </Button>
                <Modal
                    title="Widgets"
                    visible={isModalVisible}
                    onCancel={closeModalHandler}
                    width={1000}
                    footer={[]}
                >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {widgets.map((widget, index) => {
                            const key = `${index}-${widget.widgetDefinition.name}`;
                            return (
                                <Col key={key} className="gutter-row" span={6}>
                                    <Button type="link" onClick={() => handleOnClick(widget)}>
                                        {widget.widgetDefinition.name}
                                    </Button>
                                </Col>
                            );
                        })}
                    </Row>
                </Modal>
            </StyledWrapper>
        </StrictMode>
    );
};

export default EditorGeometryMenu;
