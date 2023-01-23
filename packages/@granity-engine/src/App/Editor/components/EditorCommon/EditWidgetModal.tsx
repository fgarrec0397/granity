import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { Button, ButtonStylesProps, FormField, Icons, Modal } from "@granity/ui";
import { getColor, pxToRem } from "@granity-engine/Themes/utils";
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
    const { displayWidgetName, getWidgetDictionaryFromWidget, updateWidget } = useWidgets();

    const onDisplayNameInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDisplayNameValue(target.value);
    };

    const onSave = () => {
        updateWidget(widget.id, {
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
                    <Icons.Edit />
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
