import { capitalizeString } from "@granity/helpers";
import {
    AddCircleIcon,
    Box,
    BoxProps,
    Breadcrumbs,
    BreadcrumbsProps,
    Button,
    ButtonBase,
    ButtonBaseProps,
    Container,
    DefaultImage,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    FolderIcon,
    Grid,
    IconButton,
    IconButtonProps,
    InputLabel,
    InputLabelProps,
    Link,
    LinkProps,
    MoreVertIcon,
    SvgIconProps,
    TextField,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { Theme } from "@ui/theme/ThemeProvider";
import pxToRem from "@ui/theme/utilities/pxToRem";
import { ChangeEvent, FC, FormEvent, MouseEvent } from "react";

type FilesData = {
    currentRootPath: string;
    folders: FileItem[];
    files: FileItem[];
};

type FileItem = {
    path: string;
    name: string;
    type: string;
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
};

export type FilesManagerStyles = {
    section?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    breadcrumbsLink?: LinkProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
    itemButton?: (isFile: boolean) => ButtonBaseProps;
    selectedItemButton?: (isFile: boolean) => ButtonBaseProps;
    itemName?: TypographyProps;
    itemButtonIcon?: SvgIconProps;
    itemActionButton?: IconButtonProps;
    addItemButton?: (isFile: boolean) => ButtonBaseProps;
    addIcon?: SvgIconProps;
    fileBoxInfo?: BoxProps;
};

const itemButtonStyles = (isFile: boolean) => {
    const baseStyles = {
        height: "100%",
        width: "100%",
        border: 1,
        fontSize: 16,

        "&:hover": {
            backgroundColor: "action.hover",
        },
    };

    const itemStyles = isFile
        ? {
              display: "block",
              padding: pxToRem(5),
          }
        : {
              display: "flex",
              alignItems: "center",
              padding: pxToRem(8, 16),
          };

    return {
        ...baseStyles,
        ...itemStyles,
    };
};

const addButtonStyles = (theme: Theme, isFile: boolean) => {
    const baseStyles = {
        display: "flex",
        color: theme.palette.text.primary,
        cursor: "pointer",

        alignItems: "center",
        justifyContent: "center",
    };

    const itemStyles = isFile
        ? {
              justifyContent: "center",
          }
        : {
              justifyContent: "flex-start",
          };

    return {
        ...itemButtonStyles(isFile),
        ...baseStyles,
        ...itemStyles,
    };
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
    itemButton: (isFile) => ({
        sx: itemButtonStyles(isFile),
    }),
    selectedItemButton: (isFile) => ({
        sx: {
            ...itemButtonStyles(isFile),
            fontWeight: "bold",
            backgroundColor: "background.paperLight",

            "&:hover": {
                backgroundColor: "background.paperLight",
            },
        },
    }),
    addItemButton: (isFile) => ({
        sx: (theme) => ({
            ...addButtonStyles(theme, isFile),
        }),
    }),
    itemName: {
        noWrap: true,
        textAlign: "left",
        sx: {
            flexGrow: 1,
        },
    },
    itemButtonIcon: {
        sx: {
            marginRight: pxToRem(16),
        },
    },
    addIcon: {
        sx: {
            marginRight: pxToRem(5),
        },
    },
    fileBoxInfo: {
        sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: pxToRem(0, 10),
        },
    },
    itemActionButton: {
        sx: {
            marginRight: pxToRem(-8),
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

    const onClickMoreOptions = (event: MouseEvent) => {
        event.stopPropagation();
    };

    const onSubmitAddFolderForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onAddFolder();
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
                                  <ButtonBase
                                      {...(isFolderSelected(index)
                                          ? styles.selectedItemButton?.(false)
                                          : styles.itemButton?.(false))}
                                      onClick={() => onClickFolderHandler(x.name, index)}
                                  >
                                      <FolderIcon {...styles.itemButtonIcon} />
                                      <Typography {...styles.itemName}>{x.name}</Typography>
                                      <IconButton
                                          {...styles.itemActionButton}
                                          onClick={(event) => onClickMoreOptions(event)}
                                      >
                                          <MoreVertIcon />
                                      </IconButton>
                                  </ButtonBase>
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={4} lg={3}>
                        <ButtonBase
                            {...styles.addItemButton?.(false)}
                            onClick={openCreateFolderModal}
                        >
                            <AddCircleIcon {...styles.addIcon} />
                            New Folder
                        </ButtonBase>
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
                                  <ButtonBase
                                      {...(isFileSelected(index)
                                          ? styles.selectedItemButton?.(true)
                                          : styles.itemButton?.(true))}
                                      onClick={() => onClickFileHandler(x.name, index)}
                                  >
                                      <DefaultImage />
                                      <Box {...styles.fileBoxInfo}>
                                          <Typography {...styles.itemName}>{x.name}</Typography>
                                          <IconButton {...styles.itemActionButton}>
                                              <MoreVertIcon />
                                          </IconButton>
                                      </Box>
                                  </ButtonBase>
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={3} lg={2}>
                        <InputLabel {...(styles.addItemButton?.(true) as InputLabelProps)}>
                            <AddCircleIcon {...styles.addIcon} />
                            New File
                            <input type="file" onChange={onUploadFile} multiple hidden />
                        </InputLabel>
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
