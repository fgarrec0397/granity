import { Typography } from "@app/Common/components/Html";
import Select from "@app/Common/components/Html/Select/Select";
import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { TypographyStyles } from "@app/Common/components/Html/Typography/Typography";
import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@app/Widgets/_actions/widgetsTypes";
import { FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsSelectFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
}

const styles: EditorOptionsSelectFieldStyles = {
    inputsWrapper: {
        css: css`
            margin-top: 1rem;

            &:first-child {
                margin-top: 0;
            }
        `,
    },
    label: {},
};

const EditorOptionsSelectField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = (value: string) => {
        updateOptionsValues(value, option);
    };

    if (option.fieldType === FieldType.Select) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <Typography as="label" {...styles.label}>
                    {option.displayName}
                </Typography>
                <Select
                    options={(option.selectOptions || []).map(({ value }) => ({
                        value,
                    }))}
                    selectStateProps={{
                        onChange,
                        value: optionsValues ? (optionsValues[option.name]?.value as string) : "",
                    }}
                />
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsSelectField;
