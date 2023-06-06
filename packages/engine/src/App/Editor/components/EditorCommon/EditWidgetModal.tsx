import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@engine/App/Widgets/_actions/widgetsTypes";
import Edit from "@granity/icons/Edit";
import { IconButton, SvgIconProps, TextField } from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";

import EditorModal from "./EditorModal";

export type EditWidgetModalProps = {
    widget?: WidgetDictionaryItem;
    iconSize?: SvgIconProps["fontSize"];
};

const EditWidgetModal: FC<EditWidgetModalProps> = ({ widget, iconSize = "small" }) => {
    const [displayNameValue, setDisplayNameValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { displayWidgetName, getWidgetInfoFromWidget, updateWidget } = useWidgets();

    const onDisplayNameInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setDisplayNameValue(target.value);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };
    const handleModalClose = () => {
        clearInput();
        setIsModalOpen(false);
    };

    const onSave = () => {
        if (!widget) {
            return;
        }

        updateWidget(widget.id, {
            ...getWidgetInfoFromWidget(widget.id),
            displayName: displayNameValue,
        });
        handleModalClose();
    };

    const onCancel = () => {
        handleModalClose();
    };

    const clearInput = () => {
        setDisplayNameValue("");
    };

    return (
        <>
            <IconButton onClick={handleModalOpen}>
                <Edit fontSize={iconSize} />
            </IconButton>
            {widget ? (
                <EditorModal
                    title={`Edit ${displayWidgetName(widget.id)}`}
                    open={isModalOpen}
                    onClose={handleModalClose}
                    acceptButton={{
                        text: "Save",
                        callback: onSave,
                    }}
                    cancelButton={{
                        text: "Cancel",
                        callback: onCancel,
                    }}
                >
                    {() => (
                        <TextField
                            label="Display Name"
                            onChange={onDisplayNameInputChange}
                            value={displayNameValue}
                        />
                    )}
                </EditorModal>
            ) : null}
        </>
    );
};

export default EditWidgetModal;
