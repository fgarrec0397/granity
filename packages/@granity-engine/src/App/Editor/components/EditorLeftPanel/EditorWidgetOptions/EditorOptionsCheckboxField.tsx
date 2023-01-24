import { FormField, StyledWrapper, StyledWrapperProps, TypographyStylesProps } from "@granity/ui";
import { FieldType } from "@granity-engine/App/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { ChangeEvent, FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsCheckboxFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStylesProps;
}

const styles: EditorOptionsCheckboxFieldStyles = {
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

const EditorOptionsCheckboxField: FC<Props> = ({ option }) => {
    const { optionsValues, updateOptionsValues } = useOptionsValues();

    const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        updateOptionsValues(target.value, option);
    };

    if (option.fieldType === FieldType.Checkbox) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <FormField
                    label={option.displayName}
                    inputProps={{
                        name: "displayName",
                        type: "checkbox",
                        value: optionsValues ? (optionsValues[option.name]?.value as string) : "",
                        onChange,
                    }}
                />
                {/* <Checkbox
                    onChange={handleChange}
                    checked={
                        optionsValues ? (optionsValues?.[option.name]?.value as boolean) : false
                    }
                >
                    {option.displayName}
                </Checkbox> */}
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsCheckboxField;
