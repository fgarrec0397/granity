import { ClientKeyMappings } from "@engine/App/Core/_actions/coreTypes";
import useKeyboardMapping from "@engine/App/Core/_actions/hooks/useKeyboardMapping";
import { Drawer, FilesManager, useSnackbar } from "@granity/ui";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { rootFolderName } from "../../_actions/editorConstants";
import { FileItem } from "../../_actions/editorTypes";
import { useEditor } from "../../_actions/hooks";
import useHandleLoadFiles from "../../_actions/hooks/useHandleLoadFiles";
import EditorGLBFileProcessor from "../EditorBottomPanel/EditorGLBFileProcessor";

type Props = {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onSelectFile?: (file: FileItem) => void;
};

const EditorFilesManager: FC<Props> = ({ title, isOpen, onClose, onSelectFile }) => {
    const [glbFiles, setGlbFiles] = useState<File[]>([]);
    const [isGlbFileProcessorOpen, setIsGlbFileProcessorOpen] = useState(false);
    const [selectedFileIndex, setSelectedFileIndex] = useState<number>();
    const [selectedFolderIndex, setSelectedFolderIndex] = useState<number>();
    const [newFolderName, setNewFolderName] = useState<string>("");
    const { filesData, saveFiles, editFile, deleteFile, pathToLoadFiles, updatePathToLoadFiles } =
        useEditor();
    const { enqueueSnackbar } = useSnackbar();

    const currentRootPathLinks = filesData?.currentRootPath?.split("/");

    const openUploadActionsModal = () => setIsGlbFileProcessorOpen(true);
    const closeGlbFileProcessor = () => setIsGlbFileProcessorOpen(false);

    useHandleLoadFiles();

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

    useEffect(() => {
        if (glbFiles.length) {
            openUploadActionsModal();
        }
    }, [glbFiles]);

    const onCloseHandler = () => {
        onClose();
        updatePathToLoadFiles(rootFolderName);
    };

    const onClickBreadcrumbsElement = (folder: string) => {
        const currentFolderIndex = currentRootPathLinks?.findIndex((x) => x === folder);

        if (currentFolderIndex !== undefined) {
            const clonedCurrentRootPathLinks = [...(currentRootPathLinks || [])];

            clonedCurrentRootPathLinks.splice(currentFolderIndex + 1);
            const newPath = clonedCurrentRootPathLinks?.join("/");

            updatePathToLoadFiles(newPath);
        }
    };

    const onClickFolder = (folderPath: string) => {
        if (filesData?.currentRootPath) {
            updatePathToLoadFiles(`${filesData?.currentRootPath}/${folderPath}`);
        }
    };

    const onAddFolder = async () => {
        if (newFolderName) {
            await saveFiles(pathToLoadFiles, undefined, newFolderName, true);
            enqueueSnackbar("Folder successfully created", { variant: "success" });
            setNewFolderName("");
        }
    };

    const onChangeNewFolderName = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFolderName(event.target.value);
    };

    const onUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            applyActionsAfterFileUpload(event.target.files, async () => {
                if (event.target.files) {
                    await saveFiles(pathToLoadFiles, event.target.files);
                }
            });
        }
    };

    const onDelete = async (item: FileItem) => {
        await deleteFile(item.path, item.type === "folder");
    };

    const onEdit = async (item: FileItem, newName: string) => {
        await editFile(item.path, newName);
    };

    const applyActionsAfterFileUpload = (files: FileList, callback: () => void) => {
        const tempGlbFiles: File[] = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            const extension = element.name.split(".").pop();

            if (extension === "glb") {
                tempGlbFiles.push(element);
            }
        }

        setGlbFiles(tempGlbFiles);

        callback();
    };

    return (
        <>
            <Drawer anchor="bottom" open={isOpen} onClose={onCloseHandler}>
                <FilesManager
                    title={title}
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
                    onSelectFile={onSelectFile}
                />
            </Drawer>
            <EditorGLBFileProcessor
                currentPath={pathToLoadFiles}
                isOpen={isGlbFileProcessorOpen}
                files={glbFiles}
                onClose={closeGlbFileProcessor}
            />
        </>
    );
};

export default EditorFilesManager;
