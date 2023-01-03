import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import FormField from "@app/Common/components/Html/FormField/FormField";
import Edit from "@app/Common/components/Html/Icons/Edit";
import Modal from "@app/Common/components/Html/Modal/Modal";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, pxToRem } from "@themes/utils";
import { ChangeEvent, FC, useState } from "react";
import { css } from "styled-components";

export type EditWidgetModalProps = {
    widget: WidgetDictionaryItem;
    iconWidth?: number;
};

type EditWidgetModalStyles = {
    triggerButton?: ButtonStylesProps;
};

const styles: EditWidgetModalStyles = {
    triggerButton: {
        css: css`
            color: ${getColor("common.text")};
        `,
    },
};

const EditWidgetModal: FC<EditWidgetModalProps> = ({ widget, iconWidth = 18 }) => {
    const [displayNameValue, setDisplayNameValue] = useState("");
    const { displayWidgetName, getWidgetDictionaryFromWidget, updateWidgetV2 } = useWidgets();

    const onDisplayNameInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDisplayNameValue(target.value);
    };

    const onSave = () => {
        updateWidgetV2(widget.id, {
            ...getWidgetDictionaryFromWidget(widget.id),
            displayName: displayNameValue,
        });
        clearInput();
    };

    const onCancel = () => {
        clearInput();
    };

    const clearInput = () => {
        setDisplayNameValue("");
    };

    const triggerButtonStyles = {
        ...styles.triggerButton,
        css: css`
            ${styles.triggerButton?.css}

            max-width: ${pxToRem(iconWidth)};
            max-height: ${pxToRem(iconWidth)};
        `,
    };

    return (
        <Modal
            title={`Edit ${displayWidgetName(widget.id)}`}
            size="large"
            acceptButton={{
                text: "Save",
                callback: onSave,
            }}
            cancelButton={{
                text: "Cancel",
                callback: onCancel,
            }}
            trigger={
                <Button styleType="none" {...triggerButtonStyles}>
                    <Edit />
                </Button>
            }
            options={{
                setOpen: (open) => {
                    if (!open) {
                        clearInput();
                    }
                },
            }}
        >
            {() => {
                return (
                    <FormField
                        label="Display Name"
                        inputProps={{
                            name: "displayName",
                            type: "text",
                            value: displayNameValue,
                            onChange: onDisplayNameInputChange,
                        }}
                    />
                );
            }}
        </Modal>
    );
};

export default EditWidgetModal;
