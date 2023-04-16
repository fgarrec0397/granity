import { ClientKeyMappings } from "@engine/App/Core/_actions/coreTypes";
import useKeyboardMapping from "@engine/App/Core/_actions/hooks/useKeyboardMapping";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import {
    BoxProps,
    ButtonBase,
    ButtonBaseProps,
    Drawer,
    FilesManager,
    KeyboardDoubleArrowUpIcon,
    pxToRem,
    useSnackbar,
} from "@granity/ui";
import { ChangeEvent, FC, useState } from "react";

import { FileItem } from "../../_actions/editorTypes";
import { useEditor } from "../../_actions/hooks";
import useHandleLoadFiles from "../../_actions/hooks/useHandleLoadFiles";

type EditorFilesManagerStyles = {
    wrapper?: BoxProps;
    button?: ButtonBaseProps;
};

const styles: EditorFilesManagerStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ bottom: 0 }),
        },
    },
    button: {
        sx: {
            width: "100%",
            minHeight: pxToRem(90),
            background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.404511) 130.67%, #000 192%)",
            opacity: 0.5,
            transition: "opacity .3s ease-in",
            "&:hover": {
                opacity: 1,
            },
        },
    },
};

const EditorFilesManager: FC = () => {
    const [selectedFileIndex, setSelectedFileIndex] = useState<number>();
    const [selectedFolderIndex, setSelectedFolderIndex] = useState<number>();
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [currentPath, setCurrentPath] = useState<string>("assets");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { filesData, saveFiles, editFile, deleteFile } = useEditor();
    const { enqueueSnackbar } = useSnackbar();

    useHandleLoadFiles(currentPath);

    useKeyboardMapping(
        async (keyMapping: ClientKeyMappings) => {
            if (keyMapping.delete && selectedFolderIndex !== undefined) {
                const selectedFolder = filesData.folders[selectedFolderIndex];

                if (!selectedFolder) {
                    return;
                }

                await deleteFile(selectedFolder.path, true);
            } else if (keyMapping.delete && selectedFileIndex !== undefined) {
                const selectedFile = filesData.files[selectedFileIndex];

                if (!selectedFile) {
                    return;
                }

                await deleteFile(selectedFile.path);
            }
        },
        [selectedFolderIndex, selectedFileIndex]
    );

    const currentRootPathLinks = filesData?.currentRootPath?.split("/");

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const onClick = () => {
        openDrawer();
    };

    const onClickBreadcrumbsElement = (folder: string) => {
        const currentFolderIndex = currentRootPathLinks?.findIndex((x) => x === folder);

        if (currentFolderIndex !== undefined) {
            const clonedCurrentRootPathLinks = [...(currentRootPathLinks || [])];

            clonedCurrentRootPathLinks.splice(currentFolderIndex + 1);
            const newPath = clonedCurrentRootPathLinks?.join("/");

            setCurrentPath(newPath);
        }
    };

    const onClickFolder = (folderPath: string) => {
        if (filesData?.currentRootPath) {
            setCurrentPath(`${filesData?.currentRootPath}/${folderPath}`);
        }
    };

    const onAddFolder = async () => {
        if (newFolderName) {
            await saveFiles(currentPath, undefined, newFolderName, true);
            enqueueSnackbar("Folder successfully created", { variant: "success" });
            setNewFolderName("");
        }
    };

    const onChangeNewFolderName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(event.target.value);
    };

    const onUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            await saveFiles(currentPath, event.target.files);
        }
    };

    const onDelete = async (item: FileItem) => {
        await deleteFile(item.path, item.type === "folder");
    };

    const onEdit = async (item: FileItem, newName: string) => {
        await editFile(item.path, newName);
    };

    return (
        <>
            <ButtonBase onClick={onClick} {...styles.button}>
                <KeyboardDoubleArrowUpIcon fontSize="large" />
            </ButtonBase>
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
                <FilesManager
                    breadcrumbsLinks={currentRootPathLinks}
                    filesData={filesData}
                    newFolderName={newFolderName}
                    onChangeNewFolderName={onChangeNewFolderName}
                    onClickFolder={onClickFolder}
                    onClickBreadcrumbsElement={onClickBreadcrumbsElement}
                    onUploadFile={onUploadFile}
                    onAddFolder={onAddFolder}
                    selectedFolderIndex={selectedFolderIndex}
                    setSelectedFolderIndex={setSelectedFolderIndex}
                    selectedFileIndex={selectedFileIndex}
                    setSelectedFileIndex={setSelectedFileIndex}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            </Drawer>
        </>
    );
};

export default EditorFilesManager;
