import {
    Box,
    BoxProps,
    pxToRem,
    TextField,
    TextFieldProps,
    Typography,
    TypographyProps,
} from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";

type EditorWidgetPropertyFieldsStyles = {
    section?: BoxProps;
    inputGroup?: BoxProps;
    formField?: TextFieldProps;
    title?: TypographyProps;
};

const styles: EditorWidgetPropertyFieldsStyles = {
    section: {
        sx: {
            marginBottom: pxToRem(12),
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
            maxWidth: `calc(100% / 3 - ${pxToRem(12)})`,
            marginRight: pxToRem(12),
        },
    },
    title: {
        sx: {
            marginBottom: pxToRem(8),
        },
    },
};

type Props = {
    title: string;
    fields: {
        label: string;
        value: number;
    }[];
};

const EditorWidgetPropertyFields: FC<Props> = ({ title, fields }) => {
    const { selectedWidgets, currentWidgetProperties } = useWidgets();

    if (selectedWidgets[0] && currentWidgetProperties) {
        return (
            <Box {...styles.section}>
                <Typography {...styles.title}>{title}</Typography>
                <Box {...styles.inputGroup}>
                    {fields.map((x) => (
                        <TextField
                            key={x.label}
                            label={x.label}
                            value={x.value}
                            type="number"
                            size="small"
                            labelPosition="left"
                            {...styles.formField}
                        />
                    ))}
                </Box>
            </Box>
        );
    }

    return null;
};

export default EditorWidgetPropertyFields;
