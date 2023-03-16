import { Vector3Array } from "@granity/helpers";
import {
    Box,
    BoxProps,
    TextField,
    TextFieldProps,
    Typography,
    TypographyProps,
} from "@ui/Components/Atoms";
import { pxToRem } from "@ui/Theme";
import { ChangeEvent, FC } from "react";

type Vector3InputStyles = {
    section?: BoxProps;
    inputGroup?: BoxProps;
    formField?: TextFieldProps;
    title?: TypographyProps;
};

const styles: Vector3InputStyles = {
    section: {
        sx: {
            // marginBottom: pxToRem(12),
            "&:last-child": {
                marginBottom: 0,
            },
        },
    },
    inputGroup: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
    formField: {
        sx: {
            width: "100%",
            // maxWidth: `calc(100% / 3 - ${pxToRem(12)})`,
            // marginRight: pxToRem(12),
        },
    },
    title: {
        sx: {
            // marginBottom: pxToRem(8),
        },
    },
};

export type Vector3InputProps = {
    title?: string;
    value?: Vector3Array;
    onChange?: (inputValue: number, index: number) => void;
};

const mapVector3ArrayLabel = (index: number) => {
    switch (index) {
        case 0:
            return "x";
        case 1:
            return "y";
        case 2:
            return "z";
        default:
            return "x";
    }
};

const Vector3Input: FC<Vector3InputProps> = ({ title, value, onChange }) => {
    return (
        <Box {...styles.section}>
            {title !== undefined && <Typography {...styles.title}>{title}</Typography>}
            <Box {...styles.inputGroup}>
                {(value || []).map((x, i) => (
                    <TextField
                        key={i}
                        label={mapVector3ArrayLabel(i)}
                        value={x}
                        type="number"
                        size="small"
                        labelPosition="left"
                        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
                            onChange?.(Number(target.value), i)
                        }
                        {...styles.formField}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Vector3Input;
