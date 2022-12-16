import { Typography } from "@app/Common/components/Html";
import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import FormField, { FormFieldStyles } from "@app/Common/components/Html/FormField/FormField";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { getTypography, pxToRem } from "@themes/utils";
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
            inputCss: css`
                line-height: 1;
                font-size: ${getTypography("size.tiniest")};
            `,
            wrapperCss: css`
                width: 100%;
                max-width: calc(100% / 3 - ${pxToRem(12)});
                margin-right: ${pxToRem(12)};
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
                                value: Number(currentWidgetProperties?.position[0].toFixed(3)),
                            }}
                            {...styles.formField}
                        />
                        <FormField
                            label="Y"
                            labelPosition="left"
                            inputProps={{
                                name: "positionY",
                                type: "number",
                                value: Number(currentWidgetProperties?.position[1].toFixed(3)),
                            }}
                            {...styles.formField}
                        />
                        <FormField
                            label="Z"
                            labelPosition="left"
                            inputProps={{
                                name: "positionZ",
                                type: "number",
                                value: Number(currentWidgetProperties?.position[2].toFixed(3)),
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
