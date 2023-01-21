import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@app/Widgets/_actions/widgetsTypes";
import { FormField, StyledWrapper, StyledWrapperProps, TypographyStylesProps } from "@granity/ui";
import { ChangeEvent, FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsNumberFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStylesProps;
}

const styles: EditorOptionsNumberFieldStyles = {
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

const EditorOptionsNumberField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    if (option.fieldType === FieldType.Number) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <FormField
                    label={option.displayName}
                    inputProps={{
                        name: "displayName",
                        type: "number",
                        value: optionsValues ? (optionsValues[option.name]?.value as number) : "",
                        onChange,
                    }}
                />
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsNumberField;