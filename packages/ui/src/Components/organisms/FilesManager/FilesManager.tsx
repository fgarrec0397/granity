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
    MoreVertIcon,
    SvgIconProps,
    TextField,
    Typography,
    TypographyProps,
} from "@ui/components/atoms";
import { Theme } from "@ui/theme/ThemeProvider";
import pxToRem from "@ui/theme/utilities/pxToRem";
import { ChangeEvent, FC } from "react";

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
    openCreateFolderModal: () => void;
    closeCreateFolderModal: () => void;
    onChangeNewFolderName: (event: ChangeEvent<HTMLInputElement>) => void;
    onClickFolder: (folderPath: string) => void;
    onClickBreadcrumbsElement: (folder: string) => void;
    onUploadFile: (event: ChangeEvent<HTMLInputElement>) => void;
    onAddFolder: () => Promise<void>;
};

export type FilesManagerStyles = {
    section?: BoxProps;
    header?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
    folderBox?: BoxProps;
    folderBoxInfo?: BoxProps;
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
    header: {
        sx: {
            display: "flex",
            alignItems: "center",
        },
    },
    breadcrumbs: {
        sx: {
            marginLeft: pxToRem(32),
        },
    },
    title: {
        sx: {
            fontSize: pxToRem(24),
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
            display: "flex",
            justifyContent: "space-between",
            padding: pxToRem(8, 16),
            width: "100%",
            border: 1,
            fontSize: 16,

            "&:hover": {
                backgroundColor: "action.hover",
            },
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
}) => {
    return (
        <Container>
            <Box {...styles.section}>
                <Box {...styles.header}>
                    <Typography {...styles.title}>Assets</Typography>
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
                                    underline="hover"
                                    key={index}
                                    color="inherit"
                                    onClick={() => onClickBreadcrumbsElement(x)}
                                >
                                    {capitalizeString(x)}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Box>
            <Divider />
            <Box {...styles.section}>
                <Typography {...styles.subTitle}>Folders</Typography>
                <Grid container spacing={2}>
                    {filesData?.folders?.length && filesData?.folders?.length > 0
                        ? filesData?.folders.map((x: any) => (
                              <Grid key={x.path} item xs={6} sm={4} lg={3}>
                                  <Box
                                      {...styles.folderBox}
                                      onClick={() => onClickFolder?.(x.name)}
                                  >
                                      <Box {...styles.folderBoxInfo}>
                                          <FolderIcon {...styles.folderButtonIcon} />
                                          {x.name}
                                      </Box>
                                      <IconButton {...styles.itemActionButton}>
                                          <MoreVertIcon />
                                      </IconButton>
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
                        ? filesData?.files?.map((x: any) => (
                              <Grid key={x.name} item xs={6} sm={3} lg={2}>
                                  <Box {...styles.fileBox}>
                                      <DefaultImage />
                                      <Box {...styles.fileBoxInfo}>
                                          {x.name}
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
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField onChange={onChangeNewFolderName} value={newFolderName} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onAddFolder}>Create</Button>
                    <Button variant="outlined" onClick={closeCreateFolderModal}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default FilesManager;
