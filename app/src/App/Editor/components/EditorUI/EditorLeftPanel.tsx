import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import FormField from "@app/Common/components/Html/FormField/FormField";
import Panel from "@app/Common/components/Html/Panel/Panel";
import Select from "@app/Common/components/Html/Select/Select";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import pxToRem from "@themes/utils/pxToRem";
import { FC } from "react";
import { css } from "styled-components";

import EditorFeedback from "./EditorFeedback";
import EditorWidgetOptions from "./EditorWidgetOptions/EditorWidgetOptions";

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            margin-right: 0.5em;
            width: ${pxToRem(300)};
            user-select: none;
        `,
    },
};

const EditorLeftPanel: FC = () => {
    // const { selectedWidgets } = useWidgets();

    // if (selectedWidgets[0]) {
    // }
    return <Panel {...styles.wrapper}>test</Panel>;
};

export default EditorLeftPanel;
