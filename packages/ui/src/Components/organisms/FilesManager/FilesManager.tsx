import { capitalizeString } from "@granity/helpers";
import {
    Box,
    BoxProps,
    Breadcrumbs,
    BreadcrumbsProps,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Link,
    LinkProps,
    TextField,
    Typography,
    TypographyProps,
} from "@granity/ui";
import FileManagerItem, { FileItem } from "@ui/components/moleculs/FileManagerItem/FileManagerItem";
import pxToRem from "@ui/theme/utilities/pxToRem";
import { ChangeEvent, FC, FormEvent } from "react";

type FilesData = {
    currentRootPath: string;
    folders: FileItem[];
    files: FileItem[];
};

export type FilesManagerProps = {
    isCreateFolderModalOpen: boolean;
    breadcrumbsLinks: string[];
    filesData: FilesData | undefined;
    newFolderName: string;
    selectedFolderIndex?: number;
    selectedFileIndex?: number;
    openCreateFolderModal: () => void;
    closeCreateFolderModal: () => void;
    onChangeNewFolderName: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickFolder: (folderPath: string) => void;
    onClickBreadcrumbsElement: (folder: string) => void;
    onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddFolder: () => Promise<void>;
    setSelectedFolderIndex: (index?: number) => void;
    setSelectedFileIndex: (index?: number) => void;
    onDelete: (item: FileItem) => void;
    onEdit: (item: FileItem) => void;
};

export type FilesManagerStyles = {
    section?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    breadcrumbsLink?: LinkProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
};

const styles: FilesManagerStyles = {
    section: {
        sx: {
            margin: pxToRem(25, 0),
        },
    },
    title: {
        sx: {
            fontSize: pxToRem(24),
        },
    },
    breadcrumbsLink: {
        underline: "hover",
        color: "inherit",
        sx: {
            cursor: "pointer",
        },
    },
    subTitle: {
        sx: {
            fontSize: pxToRem(15),
            marginBottom: pxToRem(12),
        },
    },
};

const FilesManager: FC<FilesManagerProps> = ({
    isCreateFolderModalOpen,
    breadcrumbsLinks,
    filesData,
    newFolderName,
    openCreateFolderModal,
    closeCreateFolderModal,
    onChangeNewFolderName,
    onClickFolder,
    onClickBreadcrumbsElement,
    onUploadFile,
    onAddFolder,
    selectedFolderIndex,
    setSelectedFolderIndex,
    selectedFileIndex,
    setSelectedFileIndex,
    onDelete,
    onEdit,
}) => {
    const isFolderNotSelected = (index: number) => {
        return selectedFolderIndex === undefined || index !== selectedFolderIndex;
    };

    const isFolderSelected = (index: number) => {
        return selectedFolderIndex !== undefined && selectedFolderIndex === index;
    };

    const isFileNotSelected = (index: number) => {
        return selectedFileIndex === undefined || index !== selectedFileIndex;
    };

    const isFileSelected = (index: number) => {
        return selectedFileIndex !== undefined && selectedFileIndex === index;
    };

    const onClickFolderHandler = (name: string, index: number) => {
        if (selectedFileIndex !== undefined) {
            setSelectedFileIndex(undefined);
        }

        if (isFolderNotSelected(index)) {
            setSelectedFolderIndex(index);

            return;
        }

        onClickFolder?.(name);
        setSelectedFolderIndex(undefined);
    };

    const onClickFileHandler = (name: string, index: number) => {
        if (selectedFolderIndex !== undefined) {
            setSelectedFolderIndex(undefined);
        }

        if (isFileNotSelected(index)) {
            setSelectedFileIndex(index);

            return;
        }

        setSelectedFileIndex(undefined);
    };

    const onSubmitAddFolderForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddFolder();
    };

    const onDeleteItem = (item: FileItem) => {
        onDelete(item);
    };

    const onEditItem = (item: FileItem) => {
        onEdit(item);
    };

    return (
        <Container>
            <Box {...styles.section}>
                <Breadcrumbs separator=">" {...styles.breadcrumbs}>
                    {breadcrumbsLinks?.map((x, index) => {
                        if (index === breadcrumbsLinks.length - 1) {
                            return (
                                <Typography key={index} color="text.primary">
                                    {capitalizeString(x)}
                                </Typography>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                onClick={() => onClickBreadcrumbsElement(x)}
                                {...styles.breadcrumbsLink}
                            >
                                {capitalizeString(x)}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Folders</Typography>
                <Grid container spacing={2}>
                    {filesData?.folders?.length && filesData?.folders?.length > 0
                        ? filesData?.folders.map((x, index) => (
                              <Grid key={x.path} item xs={6} sm={4} lg={3}>
                                  <FileManagerItem
                                      item={x}
                                      type="folder"
                                      isSelected={isFolderSelected(index)}
                                      onClick={() => onClickFolderHandler(x.name, index)}
                                      options={[
                                          {
                                              name: "Delete",
                                              onClick: onDeleteItem,
                                          },
                                          {
                                              name: "Edit",
                                              onClick: onEditItem,
                                          },
                                      ]}
                                  />
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={4} lg={3}>
                        <FileManagerItem type="addFolder" onClick={openCreateFolderModal} />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Files</Typography>
                <Grid container spacing={2}>
                    {filesData?.files?.length && filesData?.files?.length > 0
                        ? filesData?.files?.map((x, index) => (
                              <Grid key={x.name} item xs={6} sm={3} lg={2}>
                                  <FileManagerItem
                                      item={x}
                                      type="file"
                                      isSelected={isFileSelected(index)}
                                      onClick={() => onClickFileHandler(x.name, index)}
                                  />
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={3} lg={2}>
                        <FileManagerItem type="addFile" onInputFileChange={onUploadFile} />
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={isCreateFolderModalOpen} onClose={closeCreateFolderModal}>
                <form onSubmit={onSubmitAddFolderForm}>
                    <DialogTitle>New Folder</DialogTitle>
                    <DialogContent>
                        <TextField onChange={onChangeNewFolderName} value={newFolderName} />
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit">Create</Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            onClick={closeCreateFolderModal}
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Container>
    );
};

export default FilesManager;
