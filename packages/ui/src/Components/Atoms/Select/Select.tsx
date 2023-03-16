import { styled } from "@mui/material";
import SelectLib, {
    SelectChangeEvent as SelectChangeEventLib,
    SelectProps as LibSelectProps,
} from "@mui/material/Select";
import { inputStyles } from "@ui/Theme/mixins/form";
import pxToRem from "@ui/Theme/utilities/pxToRem";
import { FC } from "react";

export type SelectProps = LibSelectProps;

const StyledSelect = styled(SelectLib)`
    ${inputStyles()}

    border-radius: ${({ theme }) => pxToRem(theme.shape.borderRadius)};

    &,
    &:hover {
        background-color: transparent;
    }

    &:before,
    &:after {
        content: none;
    }
`;

const Select: FC<SelectProps> = ({ children, ...props }) => {
    return <StyledSelect {...props}>{children}</StyledSelect>;
};

export type SelectChangeEvent<T = unknown> = SelectChangeEventLib<T>;

export default Select;
