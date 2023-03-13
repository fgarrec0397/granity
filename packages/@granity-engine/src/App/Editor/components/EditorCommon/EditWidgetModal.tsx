import useWidgets from "@granity/engine/App/Widgets/_actions/hooks/useWidgets";
import { WidgetDictionaryItem } from "@granity/engine/App/Widgets/_actions/widgetsTypes";
import { EditIcon, IconButton, SvgIconProps, TextField } from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";

import EditorModal from "./EditorModal";

export type EditWidgetModalProps = {
    widget: WidgetDictionaryItem;
    iconSize?: SvgIconProps["fontSize"];
};

const EditWidgetModal: FC<EditWidgetModalProps> = ({ widget, iconSize = "small" }) => {
    const [displayNameValue, setDisplayNameValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { displayWidgetName, getWidgetDictionaryFromWidget, updateWidget } = useWidgets();

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
        updateWidget(widget.id, {
            ...getWidgetDictionaryFromWidget(widget.id),
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
                <EditIcon fontSize={iconSize} />
            </IconButton>
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
        </>
    );
};

export default EditWidgetModal;
