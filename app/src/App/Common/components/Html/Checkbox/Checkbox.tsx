import { uidGenerator } from "@app/Common/utilities";
import { ThemedFlattenInterpolation } from "@themes/_typings";
import { Checkbox as CheckboxLib, CheckboxProps as CheckboxLibProps } from "ariakit/checkbox";
import { FC, useMemo } from "react";

import Label, { LabelProps } from "../Label/Label";

export type CheckboxStyles = {
    styling?: {
        wrapperCss?: ThemedFlattenInterpolation;
        labelCss?: ThemedFlattenInterpolation;
        checkboxCss?: ThemedFlattenInterpolation;
    };
};

export type CheckboxComponentProps = {
    label?: string;
    labelProps?: LabelProps;
    checkboxProp?: CheckboxLibProps;
};

export type CheckboxProps = CheckboxComponentProps & CheckboxStyles;

const Checkbox: FC<CheckboxProps> = ({ checkboxProp, label, labelProps, styling }) => {
    const labelPropsMemo = useMemo(() => {
        return {
            ...labelProps,
            name: labelProps?.name || uidGenerator(),
        };
    }, [labelProps]);

    return (
        <Label
            labelPosition={labelProps?.labelPosition}
            additionalCss={styling?.labelCss}
            {...labelPropsMemo}
        >
            <CheckboxLib className="checkbox" {...checkboxProp} /> {label}
        </Label>
    );
};

export default Checkbox;
