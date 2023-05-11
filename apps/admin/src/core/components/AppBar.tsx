import LaunchEditor from "@granity/icons/LaunchEditor";
import Logout from "@granity/icons/Logout";
import { AppMenu, Avatar, Box, BoxProps, IconButton, pxToRem, SvgIconProps } from "@granity/ui";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

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

    const handleOpenEditor = () => {
        router.push("/editor");
    };

    return (
        <Box {...styles.wrapper}>
            <IconButton onClick={handleOpenEditor}>
                <LaunchEditor {...styles.editorIcon} />
            </IconButton>
            <AppMenu
                title="Account settings"
                id="account-menu"
                icon={<Avatar sx={{ width: 40, height: 40 }}>M</Avatar>}
                menuItems={[
                    {
                        text: "Logout",
                        onClick: () => signOut(),
                        icon: <Logout fontSize="small" />,
                    },
                ]}
            />
        </Box>
    );
};

export default AppBar;
