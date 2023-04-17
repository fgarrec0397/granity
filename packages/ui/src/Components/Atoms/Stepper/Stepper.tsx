import StepLib, { StepProps as LibStepProps } from "@mui/material/Step";
import StepLabelLib, { StepLabelProps as LibStepLabelProps } from "@mui/material/StepLabel";
import StepperLib, { StepperProps as LibStepperProps } from "@mui/material/Stepper";
import { FC } from "react";

export type StepperProps = LibStepperProps;
export type StepProps = LibStepProps;
export type StepLabelProps = LibStepLabelProps;

const Stepper: FC<StepperProps> = ({ children, ...props }) => {
    return <StepperLib {...props}>{children}</StepperLib>;
};

export const Step: FC<StepProps> = ({ children, ...props }) => {
    return <StepLib {...props}>{children}</StepLib>;
};

export const StepLabel: FC<StepLabelProps> = ({ children, ...props }) => {
    return <StepLabelLib {...props}>{children}</StepLabelLib>;
};

export default Stepper;
