import { ClientKeyMappings } from "@engine/App/Core/_actions/coreTypes";
import useKeyboardMapping from "@engine/App/Core/_actions/hooks/useKeyboardMapping";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import {
    Box,
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

import { useEditor } from "../../_actions/hooks";
import useHandleLoadFiles from "../../_actions/hooks/useHandleLoadFiles";

type EditorBottomPanellStyles = {
    wrapper?: BoxProps;
    button?: ButtonBaseProps;
};

const styles: EditorBottomPanellStyles = {
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

const EditorBottomPanell: FC = () => {
    const [selectedFolderIndex, setSelectedFolderIndex] = useState<number>();
    const [newFolderName, setNewFolderName] = useState<string>("");
    const [isCreateFolderModalOpen, setIsCreateForlderModalOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState<string>("assets");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { filesData, saveFiles, deleteFile } = useEditor();
    const { enqueueSnackbar } = useSnackbar();

    useHandleLoadFiles(currentPath);

    useKeyboardMapping(
        async (keyMapping: ClientKeyMappings) => {
            if (keyMapping.delete && selectedFolderIndex !== undefined) {
                const selectedFolder = filesData.folders[selectedFolderIndex];

                if (!selectedFolder) {
                    return;
                }

                await deleteFile(selectedFolder.path);
            }
        },
        [selectedFolderIndex]
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
            const formData = new FormData();

            formData.append("addFolder", "true");
            formData.append("folderName", newFolderName);
            formData.append("currentPath", currentPath);

            await saveFiles(formData);
            closeCreateFolderModal();
            enqueueSnackbar("Folder successfully created", { variant: "success" });
        }
    };

    const onChangeNewFolderName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(event.target.value);
    };

    const openCreateFolderModal = () => {
        setIsCreateForlderModalOpen(true);
    };

    const closeCreateFolderModal = () => {
        setIsCreateForlderModalOpen(false);
    };

    const onUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (event.target.files?.length) {
            formData.append("currentPath", currentPath);

            for (let i = 0; i < event.target.files.length; i++) {
                // Need to send files after all other inputs because Multer does not support it
                formData.append(`filesToUpload`, event.target.files[i]);
            }

            await saveFiles(formData);
        }
    };

    return (
        <Box {...styles.wrapper}>
            <ButtonBase onClick={onClick} {...styles.button}>
                <KeyboardDoubleArrowUpIcon fontSize="large" />
            </ButtonBase>
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
                <FilesManager
                    isCreateFolderModalOpen={isCreateFolderModalOpen}
                    breadcrumbsLinks={currentRootPathLinks}
                    filesData={filesData}
                    newFolderName={newFolderName}
                    openCreateFolderModal={openCreateFolderModal}
                    closeCreateFolderModal={closeCreateFolderModal}
                    onChangeNewFolderName={onChangeNewFolderName}
                    onClickFolder={onClickFolder}
                    onClickBreadcrumbsElement={onClickBreadcrumbsElement}
                    onUploadFile={onUploadFile}
                    onAddFolder={onAddFolder}
                    selectedFolderIndex={selectedFolderIndex}
                    setSelectedFolderIndex={setSelectedFolderIndex}
                />
            </Drawer>
        </Box>
    );
};

export default EditorBottomPanell;
