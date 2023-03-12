import {
    Avatar,
    Box,
    BoxProps,
    Divider,
    IconButton,
    LaunchEditorIcon,
    ListItemIcon,
    LogoutIcon,
    Menu,
    MenuItem,
    SvgIconProps,
    Tooltip,
} from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AppBarStyles = {
    wrapper?: BoxProps;
    logoWrapper?: BoxProps;
    editorIcon?: SvgIconProps;
};

const styles: AppBarStyles = {
    wrapper: {
        sx: {
            minHeight: pxToRem(175),
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
        },
    },
    editorIcon: {
        sx: {
            fontSize: pxToRem(30),
        },
    },
};

const AppBar = () => {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenEditor = () => {
        router.push("/editor");
    };

    return (
        <>
            <Box {...styles.wrapper}>
                <IconButton onClick={handleOpenEditor}>
                    <LaunchEditorIcon {...styles.editorIcon} />
                </IconButton>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="large"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default AppBar;
