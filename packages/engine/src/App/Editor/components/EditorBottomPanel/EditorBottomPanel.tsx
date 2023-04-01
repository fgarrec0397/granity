import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import { capitalizeString, useMutation, useQuery, useQueryClient } from "@granity/helpers";
import {
    AddCircleIcon,
    Box,
    BoxProps,
    Breadcrumbs,
    BreadcrumbsProps,
    ButtonBase,
    ButtonBaseProps,
    Container,
    DefaultImage,
    Divider,
    Drawer,
    FolderIcon,
    Grid,
    IconButton,
    IconButtonProps,
    InputLabel,
    InputLabelProps,
    KeyboardDoubleArrowUpIcon,
    Link,
    MoreVertIcon,
    pxToRem,
    SvgIconProps,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { ChangeEvent, FC, useRef, useState } from "react";

import { useEditor } from "../../_actions/hooks";

type EditorBottomPanellStyles = {
    wrapper?: BoxProps;
    section?: BoxProps;
    header?: BoxProps;
    breadcrumbs?: BreadcrumbsProps;
    button?: ButtonBaseProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
    folderBox?: BoxProps;
    folderBoxInfo?: BoxProps;
    folderButtonIcon?: SvgIconProps;
    itemActionButton?: IconButtonProps;
    fileBox?: BoxProps;
    addFileButton?: InputLabelProps;
    addFileButtonInfo?: BoxProps;
    addIcon?: SvgIconProps;
    fileBoxInfo?: BoxProps;
};

const styles: EditorBottomPanellStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ bottom: 0 }),
        },
    },
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
            padding: pxToRem(5),
            width: "100%",
            height: "100%",
            border: 1,
            fontSize: 16,

            "&:hover": {
                backgroundColor: "action.hover",
            },
        },
    },
    addFileButton: {
        sx: (theme) => ({
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary,
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

const EditorBottomPanell: FC = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [currentPath, setCurrentPath] = useState<string>("assets");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { files } = useEditor();
    const queryClient = useQueryClient();

    // const mutation = useMutation(saveFiles, {
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["files", { id: 5 }], data);
    //     },
    // });

    // const currentRootPathLinks = files?.currentRootPath?.split("/");

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const onClick = () => {
        openDrawer();
    };

    // const onClickBreadcrumbsElement = (folder: string) => {
    //     const currentFolderIndex = currentRootPathLinks?.findIndex((x) => x === folder);

    //     if (currentFolderIndex !== undefined) {
    //         const clonedCurrentRootPathLinks = [...(currentRootPathLinks || [])];

    //         clonedCurrentRootPathLinks.splice(currentFolderIndex + 1);
    //         const newPath = clonedCurrentRootPathLinks?.join("/");

    //         setCurrentPath(newPath);
    //     }
    // };

    // const onClickFolder = (folderPath: string) => {
    //     if (data?.currentRootPath) {
    //         setCurrentPath(`${data?.currentRootPath}/${folderPath}`);
    //     }
    // };

    // const onUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    //     const formData = new FormData();

    //     if (event.target.files?.length) {
    //         formData.append("currentPath", currentPath);

    //         for (let i = 0; i < event.target.files.length; i++) {
    //             // Need to send files after all other inputs because Multer does not support it
    //             formData.append(`filesToUpload`, event.target.files[i]);
    //         }

    //         const response = await saveFiles?.(formData);
    //     }
    // };
    return null;
    // return (
    //     <Box {...styles.wrapper}>
    //         <ButtonBase onClick={onClick} {...styles.button}>
    //             <KeyboardDoubleArrowUpIcon fontSize="large" />
    //         </ButtonBase>
    //         <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
    //             <Container>
    //                 <Box {...styles.section}>
    //                     <Box {...styles.header}>
    //                         <Typography {...styles.title}>Assets</Typography>
    //                         <Breadcrumbs separator=">" {...styles.breadcrumbs}>
    //                             {currentRootPathLinks?.map((x, index) => {
    //                                 if (index === currentRootPathLinks.length - 1) {
    //                                     return (
    //                                         <Typography key={index} color="text.primary">
    //                                             {capitalizeString(x)}
    //                                         </Typography>
    //                                     );
    //                                 }

    //                                 return (
    //                                     <Link
    //                                         underline="hover"
    //                                         key={index}
    //                                         color="inherit"
    //                                         onClick={() => onClickBreadcrumbsElement(x)}
    //                                     >
    //                                         {capitalizeString(x)}
    //                                     </Link>
    //                                 );
    //                             })}
    //                         </Breadcrumbs>
    //                     </Box>
    //                 </Box>
    //                 <Divider />
    //                 <Box {...styles.section}>
    //                     <Typography {...styles.subTitle}>Folders</Typography>
    //                     <Grid container spacing={2}>
    //                         {data?.folders?.length && data?.folders?.length > 0
    //                             ? data?.folders.map((x) => (
    //                                   <Grid key={x.path} item xs={6} sm={4} lg={3}>
    //                                       <Box
    //                                           {...styles.folderBox}
    //                                           onClick={() => onClickFolder(x.name)}
    //                                       >
    //                                           <Box {...styles.folderBoxInfo}>
    //                                               <FolderIcon {...styles.folderButtonIcon} />
    //                                               {x.name}
    //                                           </Box>
    //                                           <IconButton {...styles.itemActionButton}>
    //                                               <MoreVertIcon />
    //                                           </IconButton>
    //                                       </Box>
    //                                   </Grid>
    //                               ))
    //                             : null}
    //                     </Grid>
    //                 </Box>
    //                 <Divider />
    //                 <Box {...styles.section}>
    //                     <Typography {...styles.subTitle}>Files</Typography>
    //                     <Grid container spacing={2}>
    //                         {data?.files.map((x) => (
    //                             <Grid key={x.name} item xs={6} sm={3} lg={2}>
    //                                 <Box {...styles.fileBox}>
    //                                     <DefaultImage />
    //                                     <Box {...styles.fileBoxInfo}>
    //                                         {x.name}
    //                                         <IconButton {...styles.itemActionButton}>
    //                                             <MoreVertIcon />
    //                                         </IconButton>
    //                                     </Box>
    //                                 </Box>
    //                             </Grid>
    //                         ))}
    //                         <Grid item xs={6} sm={3} lg={2}>
    //                             <Box {...styles.fileBox}>
    //                                 <InputLabel {...styles.addFileButton}>
    //                                     <Box {...styles.addFileButtonInfo}>
    //                                         <AddCircleIcon {...styles.addIcon} />
    //                                         New File
    //                                     </Box>
    //                                     <input
    //                                         ref={ref}
    //                                         type="file"
    //                                         onChange={onUploadFile}
    //                                         multiple
    //                                         hidden
    //                                     />
    //                                 </InputLabel>
    //                             </Box>
    //                         </Grid>
    //                     </Grid>
    //                 </Box>
    //             </Container>
    //         </Drawer>
    //     </Box>
    // );
};

export default EditorBottomPanell;
