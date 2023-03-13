import {
    AccountMenu,
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
import { signOut } from "next-auth/react";
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
                <AccountMenu
                    title="Account settings"
                    id="account-menu"
                    icon={<Avatar sx={{ width: 40, height: 40 }}>M</Avatar>}
                    menuItems={[
                        {
                            text: "My Account",
                            onClick: handleClose,
                            icon: <Avatar />,
                        },
                        {
                            text: "Logout",
                            onClick: () => signOut(),
                            icon: <LogoutIcon fontSize="small" />,
                        },
                    ]}
                />
            </Box>
        </>
    );
};

export default AppBar;
