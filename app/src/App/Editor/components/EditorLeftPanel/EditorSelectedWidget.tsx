import { Typography } from "@app/Common/components/Html";
import Box, { BoxStyles } from "@app/Common/components/Html/Box/Box";
import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import FormField from "@app/Common/components/Html/FormField/FormField";
import Edit from "@app/Common/components/Html/Icons/Edit";
import Modal from "@app/Common/components/Html/Modal/Modal";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { getColor, pxToRem } from "@themes/utils";
import { ChangeEvent, FC, useState } from "react";
import { css } from "styled-components";

type EditorSelectedWidgetStyles = {
    box?: BoxStyles;
    triggerButton?: ButtonStylesProps;
};

const styles: EditorSelectedWidgetStyles = {
    box: {
        wrapper: {
            css: css`
                display: flex;
                align-items: center;
                justify-content: space-between;
            `,
        },
    },
    triggerButton: {
        css: css`
            max-width: ${pxToRem(18)};
            max-height: ${pxToRem(18)};
            color: ${getColor("common.text")};
        `,
    },
};

const EditorSelectedWidget: FC = () => {
    const [displayNameValue, setDisplayNameValue] = useState("");
    const { displayWidgetName, selectedWidgets, updateWidget } = useWidgets();

    const onDisplayNameInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDisplayNameValue(target.value);
    };

    const onSave = () => {
        updateWidget(selectedWidgets[0]);
        clearInput();
    };

    const onCancel = () => {
        clearInput();
    };

    const clearInput = () => {
        setDisplayNameValue("");
    };

    return (
        <Box styling={styles.box}>
            {selectedWidgets.length ? (
                <>
                    <Typography>{displayWidgetName(selectedWidgets[0].id)}</Typography>
                    <Modal
                        title={`Edit ${displayWidgetName(selectedWidgets[0].id)}`}
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
                            <Button styleType="none" {...styles.triggerButton}>
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
                </>
            ) : (
                <Typography>No widget selected</Typography>
            )}
        </Box>
    );
};

export default EditorSelectedWidget;
