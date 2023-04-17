import FormGroupLib, { FormGroupProps as LibFormGroupProps } from "@mui/material/FormGroup";
import FormLabelLib, { FormLabelProps as LibFormLabelProps } from "@mui/material/FormLabel";
import { FC } from "react";

export type FormGroupProps = LibFormGroupProps;
export type FormLabelProps = LibFormLabelProps;

const FormGroup: FC<FormGroupProps> = (props) => {
    return <FormGroupLib {...props} />;
};

export const FormLabel: FC<FormLabelProps> = (props) => {
    return <FormLabelLib {...props} />;
};

export default FormGroup;
