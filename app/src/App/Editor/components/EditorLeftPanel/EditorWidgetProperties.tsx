import { Typography } from "@app/Common/components/Html";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import FormField, { FormFieldStyles } from "@app/Common/components/Html/FormField/FormField";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";
import { css } from "styled-components";

type EditorWidgetPropertiesStyles = {
    section?: StyledWrapperProps;
    inputGroup?: StyledWrapperProps;
    formField?: FormFieldStyles;
};

const styles: EditorWidgetPropertiesStyles = {
    section: {
        css: css`
            /* background-color: red; */
        `,
    },
    inputGroup: {
        css: css`
            display: flex;
            align-items: center;
        `,
    },
    formField: {
        styling: {
            wrapperCss: css`
                background-color: red;
            `,
        },
    },
};

const EditorWidgetProperties: FC = () => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <Collapse title="Properties">
                <StyledWrapper {...styles.section}>
                    <Typography>Position</Typography>
                    <StyledWrapper {...styles.inputGroup}>
                        <FormField
                            label="X"
                            labelPosition="left"
                            inputProps={{
                                name: "positionX",
                                type: "number",
                            }}
                            {...styles.formField}
                        />
                    </StyledWrapper>
                </StyledWrapper>
            </Collapse>
        );
    }

    return null;
};

export default EditorWidgetProperties;
