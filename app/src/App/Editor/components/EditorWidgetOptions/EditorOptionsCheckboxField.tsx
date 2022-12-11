import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { TypographyStyles } from "@app/Common/components/Html/Typography";
import { FieldType } from "@app/Widgets/_actions/widgetsConstants";
import { WidgetBaseOptions } from "@app/Widgets/_actions/widgetsTypes";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { FC } from "react";
import { css } from "styled-components";

import useOptionsValues from "./hooks/useOptionsValues";

type Props = {
    option: WidgetBaseOptions;
};

interface EditorOptionsCheckboxFieldStyles {
    inputsWrapper?: StyledWrapperProps;
    label?: TypographyStyles;
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

    const handleChange = (event: CheckboxChangeEvent) => {
        updateOptionsValues(event.target.checked, option);
    };

    if (option.fieldType === FieldType.Checkbox) {
        return (
            <StyledWrapper {...styles.inputsWrapper}>
                <Checkbox
                    onChange={handleChange}
                    checked={
                        optionsValues ? (optionsValues?.[option.name]?.value as boolean) : false
                    }
                >
                    {option.displayName}
                </Checkbox>
            </StyledWrapper>
        );
    }

    return null;
};

export default EditorOptionsCheckboxField;
