import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import {
    WidgetObjectModule,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";
import { Button, Col, Modal, Row, Typography } from "antd";
import { FC, StrictMode, useState } from "react";
import { css } from "styled-components";

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
    const { widgetsModules, widgetsUIModules } = useWidgetsModules();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOnClick = (widgetModule: WidgetObjectModule): void => {
        const widget: WidgetObjectsDictionaryItem = {
            ...widgetModule,
            id: "",
        };
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
                    <Typography>Game Objects</Typography>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {widgetsModules.map((widget, index) => {
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
                    <Typography>UI</Typography>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        {widgetsUIModules.map((widget, index) => {
                            const key = `${index}-${widget.widgetDefinition.name}`;

                            // const widgetSceneObject = mapWidgetModuleToWidgetSceneObject(widget);
                            return (
                                <Col key={key} className="gutter-row" span={6}>
                                    <Button
                                        type="link"
                                        // onClick={() => handleOnClick(widgetSceneObject)}
                                    >
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
