import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";

type Props = {
    files: File[];
};

const EditorUploadFileActionsStepper: FC<Props> = ({ files }) => {
    const [generateComponentCheckboxValue, setGenerateComponentCheckboxValue] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onGenerateComponentCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked);
    };

    return (
        <>
            {files.length > 1 ? (
                <Stepper activeStep={activeStep}>
                    {files.map((x, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};

                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }

                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }

                        return (
                            <Step key={index} {...stepProps}>
                                <StepLabel {...labelProps}>{x.name}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            ) : null}
            <Box>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={generateComponentCheckboxValue}
                                onChange={onGenerateComponentCheckboxChange}
                            />
                        }
                        label="Generate a JSX component from this .glb file?"
                    />
                </FormGroup>
            </Box>
        </>
    );
};

export default EditorUploadFileActionsStepper;
