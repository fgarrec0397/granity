import { layoutStyles } from "@engine/Theme/mixins/layout";
import {
    Box,
    BoxProps,
    ButtonBase,
    ButtonBaseProps,
    Container,
    Divider,
    Drawer,
    FolderIcon,
    Grid,
    IconButton,
    IconButtonProps,
    KeyboardDoubleArrowUpIcon,
    MoreVertIcon,
    pxToRem,
    SvgIconProps,
    Typography,
    TypographyProps,
} from "@granity/ui";
import { FC, useState } from "react";

type EditorBottomPanellStyles = {
    wrapper?: BoxProps;
    section?: BoxProps;
    button?: ButtonBaseProps;
    title?: TypographyProps;
    subTitle?: TypographyProps;
    folderBox?: BoxProps;
    folderBoxInfo?: BoxProps;
    folderButtonIcon?: SvgIconProps;
    folderActionButton?: IconButtonProps;
};

const styles: EditorBottomPanellStyles = {
    wrapper: {
        sx: {
            ...layoutStyles({ bottom: 0 }),
        },
    },
    section: {
        margin: pxToRem(25, 0),
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
    folderActionButton: {
        sx: {
            marginRight: pxToRem(-16),
        },
    },
};

const EditorBottomPanell: FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

    const onClick = () => {
        openDrawer();
    };

    return (
        <Box {...styles.wrapper}>
            <ButtonBase onClick={onClick} {...styles.button}>
                <KeyboardDoubleArrowUpIcon fontSize="large" />
            </ButtonBase>
            <Drawer anchor="bottom" open={isDrawerOpen} onClose={closeDrawer}>
                <Container>
                    <Box {...styles.section}>
                        <Typography {...styles.title}>Assets</Typography>
                    </Box>
                    <Divider />
                    <Box {...styles.section}>
                        <Typography {...styles.subTitle}>Folders</Typography>
                        <Grid container spacing={2}>
                            {[1, 2, 3, 4, 5, 6, 7].map((x) => (
                                <Grid key={x} item xs={6} md={3} lg={2}>
                                    <Box {...styles.folderBox}>
                                        <Box {...styles.folderBoxInfo}>
                                            <FolderIcon {...styles.folderButtonIcon} />
                                            Folder {x}
                                        </Box>
                                        <IconButton {...styles.folderActionButton}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Divider />
                </Container>
            </Drawer>
        </Box>
    );
};

export default EditorBottomPanell;
