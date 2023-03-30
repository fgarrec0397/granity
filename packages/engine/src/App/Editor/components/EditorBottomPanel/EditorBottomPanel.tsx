import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { layoutStyles } from "@engine/Theme/mixins/layout";
import { capitalizeString, useQuery } from "@granity/helpers";
import {
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
    KeyboardDoubleArrowUpIcon,
    Link,
    MoreVertIcon,
    pxToRem,
    SvgIconProps,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { ChangeEvent, FC, useRef, useState } from "react";

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
            border: 1,
            fontSize: 16,

            "&:hover": {
                backgroundColor: "action.hover",
            },
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
    const { getFiles } = useCore();

    const { data } = useQuery(["files", currentPath], () => getFiles?.(currentPath), {
        enabled: getFiles !== undefined,
    });

    const currentRootPathLinks = data?.currentRootPath?.split("/");

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
        if (data?.currentRootPath) {
            setCurrentPath(`${data?.currentRootPath}/${folderPath}`);
        }
    };

    const onUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const formData = new FormData();

        if (event.target.files?.length) {
            for (let i = 0; i < event.target.files.length; i++) {
                formData.append(`filesToUpload`, event.target.files[i]);
            }

            fetch("/server/files", {
                method: "POST",
                body: formData,
            }).then((res) => console.log(res));
        }
    };

    return (
        <Box {...styles.wrapper}>
            <ButtonBase onClick={onClick} {...styles.button}>
                <KeyboardDoubleArrowUpIcon fontSize="large" />
            </ButtonBase>
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
                <Container>
                    <Box {...styles.section}>
                        <Box {...styles.header}>
                            <Typography {...styles.title}>Assets</Typography>
                            <Breadcrumbs separator=">" {...styles.breadcrumbs}>
                                {currentRootPathLinks?.map((x, index) => {
                                    if (index === currentRootPathLinks.length - 1) {
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
                    {data?.folders?.length && data?.folders?.length > 0 ? (
                        <>
                            <Box {...styles.section}>
                                <Typography {...styles.subTitle}>Folders</Typography>
                                <Grid container spacing={2}>
                                    {data?.folders.map((x) => (
                                        <Grid key={x.path} item xs={6} sm={4} lg={3}>
                                            <Box
                                                {...styles.folderBox}
                                                onClick={() => onClickFolder(x.name)}
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
                                    ))}
                                    <Grid item xs={6} sm={4} lg={3}>
                                        <input
                                            ref={ref}
                                            type="file"
                                            onChange={onUploadFile}
                                            multiple
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Divider />
                        </>
                    ) : null}
                    <Box {...styles.section}>
                        <Typography {...styles.subTitle}>Files</Typography>
                        <Grid container spacing={2}>
                            {data?.files.map((x) => (
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
                            ))}
                        </Grid>
                    </Box>
                </Container>
            </Drawer>
        </Box>
    );
};

export default EditorBottomPanell;
