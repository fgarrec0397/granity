import { styled } from "@mui/material";
import CheckboxLib, { CheckboxProps as LibCheckboxProps } from "@mui/material/Checkbox";
import pxToRem from "@ui/Theme/utilities/pxToRem";
import { FC } from "react";

export type CheckboxProps = LibCheckboxProps;

const StyledCheckbox = styled(CheckboxLib)`
    &:hover {
        background-color: transparent;
    }

    &.Mui-disabled {
        cursor: not-allowed;
    }

    &.Mui-checked {
        color: ${({ theme }) => theme.palette.secondary.main};

        .MuiSvgIcon-root {
            color: ${({ theme }) => theme.palette.secondary.main};
        }
    }

    .MuiSvgIcon-root {
        color: ${({ theme }) => theme.palette.background.textField};
        background-color: ${({ theme }) => theme.palette.background.textField};
        border-radius: ${({ theme }) => pxToRem(theme.shape.borderRadius)};
    }
`;

const Checkbox: FC<CheckboxProps> = (props) => {
    return <StyledCheckbox {...props} />;
};

export default Checkbox;
