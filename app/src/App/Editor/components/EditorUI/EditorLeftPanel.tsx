import StyledWrapper, { StyledWrapperProps } from "@common/components/Html/StyledWrapper";
import useWidgets from "@widgets/_actions/hooks/useWidgets";
import { Collapse } from "antd";
import { FC } from "react";
import { css } from "styled-components";

import EditorFeedback from "./EditorFeedback";
import EditorWidgetOptions from "./EditorWidgetOptions/EditorWidgetOptions";

const { Panel } = Collapse;

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            margin-right: 0.5em;
            width: 300px;
            user-select: none;
        `,
    },
};

const EditorLeftPanel: FC = () => {
    const { selectedWidgets } = useWidgets();

    if (selectedWidgets[0]) {
        return (
            <StyledWrapper {...styles.wrapper}>
                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="WidgetName: Not supported yet" key="1">
                        <EditorFeedback />
                    </Panel>
                    <Panel header="Options" key="2">
                        <EditorWidgetOptions />
                    </Panel>
                </Collapse>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorLeftPanel;
