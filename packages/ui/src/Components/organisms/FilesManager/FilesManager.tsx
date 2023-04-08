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
import { ChangeEvent, FC, FormEvent, MouseEvent, useRef } from "react";

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
    openCreateFolderModal: () => void;
    closeCreateFolderModal: () => void;
    onChangeNewFolderName: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickFolder: (folderPath: string) => void;
    onClickBreadcrumbsElement: (folder: string) => void;
    onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddFolder: () => Promise<void>;
    setSelectedFolderIndex: (index?: number) => void;
};

export type FilesManagerStyles = {
    section?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    breadcrumbsLink?: LinkProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
    folderBox?: BoxProps;
    selectedFolderBox?: BoxProps;
    folderBoxInfo?: BoxProps;
    folderName?: TypographyProps;
    folderButtonIcon?: SvgIconProps;
    itemActionButton?: IconButtonProps;
    fileBox?: BoxProps;
    addButton?: InputLabelProps;
    addFolderButton?: ButtonBaseProps;
    addFileButtonInfo?: BoxProps;
    addIcon?: SvgIconProps;
    fileBoxInfo?: BoxProps;
};

const fileBoxStyles = {
    padding: pxToRem(5),
    width: "100%",
    height: "100%",
    border: 1,
    fontSize: 16,

    "&:hover": {
        backgroundColor: "action.hover",
    },
};

const addButtonStyles = (theme: Theme) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.primary,
    cursor: "pointer",
    ...fileBoxStyles,
});

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
    folderBox: {
        sx: {
            width: "100%",
            border: 1,
            fontSize: 16,

            "&:hover": {
                backgroundColor: "action.hover",
            },
        },
    },
    selectedFolderBox: {
        sx: {
            width: "100%",
            border: 1,
            fontSize: 16,
            fontWeight: "bold",
            backgroundColor: "background.paperLight",
        },
    },
    addFolderButton: {
        sx: (theme) => ({
            ...addButtonStyles(theme),
        }),
    },
    folderBoxInfo: {
        sx: {
            display: "flex",
            alignItems: "center",
            padding: pxToRem(8, 16),
        },
    },
    folderName: {
        noWrap: true,
        sx: {
            flexGrow: 1,
        },
    },
    folderButtonIcon: {
        sx: {
            marginRight: pxToRem(16),
        },
    },
    fileBox: {
        sx: {
            ...fileBoxStyles,
        },
    },
    addButton: {
        sx: (theme) => ({
            ...addButtonStyles(theme),
        }),
    },
    addFileButtonInfo: {
        sx: {
            display: "flex",
            alignItems: "center",
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
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    console.log(inputRef, "inputRef");

    const isNotSelected = (index: number) => {
        return selectedFolderIndex === undefined || index !== selectedFolderIndex;
    };

    const isSelected = (index: number) => {
        return selectedFolderIndex !== undefined && selectedFolderIndex === index;
    };

    const onClickFolderHandler = (name: string, index: number) => {
        if (isNotSelected(index)) {
            setSelectedFolderIndex(index);

            return;
        }

        onClickFolder?.(name);
        setSelectedFolderIndex(undefined);
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
                                  <Box
                                      {...(isSelected(index)
                                          ? styles.selectedFolderBox
                                          : styles.folderBox)}
                                      onClick={() => onClickFolderHandler(x.name, index)}
                                  >
                                      <Box {...styles.folderBoxInfo}>
                                          <FolderIcon {...styles.folderButtonIcon} />
                                          <Typography {...styles.folderName}>{x.name}</Typography>
                                          <IconButton
                                              {...styles.itemActionButton}
                                              onClick={(event) => onClickMoreOptions(event)}
                                          >
                                              <MoreVertIcon />
                                          </IconButton>
                                      </Box>
                                  </Box>
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={4} lg={3}>
                        <ButtonBase {...styles.addFolderButton} onClick={openCreateFolderModal}>
                            <Box {...styles.addFileButtonInfo}>
                                <AddCircleIcon {...styles.addIcon} />
                                New Folder
                            </Box>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Files</Typography>
                <Grid container spacing={2}>
                    {filesData?.files?.length && filesData?.files?.length > 0
                        ? filesData?.files?.map((x) => (
                              <Grid key={x.name} item xs={6} sm={3} lg={2}>
                                  <Box {...styles.fileBox}>
                                      <DefaultImage />
                                      <Box {...styles.fileBoxInfo}>
                                          <Typography noWrap>{x.name}</Typography>
                                          <IconButton {...styles.itemActionButton}>
                                              <MoreVertIcon />
                                          </IconButton>
                                      </Box>
                                  </Box>
                              </Grid>
                          ))
                        : null}
                    <Grid item xs={6} sm={3} lg={2}>
                        <InputLabel {...styles.addButton}>
                            <Box {...styles.addFileButtonInfo}>
                                <AddCircleIcon {...styles.addIcon} />
                                New File
                            </Box>
                            <input type="file" onChange={onUploadFile} multiple hidden />
                        </InputLabel>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={isCreateFolderModalOpen} onClose={closeCreateFolderModal}>
                <form onSubmit={onSubmitAddFolderForm}>
                    <DialogTitle>New Folder</DialogTitle>
                    <DialogContent>
                        <TextField
                            ref={inputRef}
                            id="folderName"
                            onChange={onChangeNewFolderName}
                            value={newFolderName}
                        />
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
