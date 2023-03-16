import {
    Box,
    BoxProps,
    HomeIcon,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    pxToRem,
} from "@granity/ui";

import Logo, { LogoStyles } from "./Logo";

type SideBarStyles = {
    wrapper?: BoxProps;
    logoWrapper?: BoxProps;
    logo?: LogoStyles;
};

const styles: SideBarStyles = {
    wrapper: {
        sx: {
            padding: pxToRem(0, 30),
        },
    },
    logoWrapper: {
        sx: {
            minHeight: pxToRem(175),
            display: "flex",
            alignItems: "center",
        },
    },
    logo: {
        logoWrapper: {
            sx: {
                marginBottom: 0,
            },
        },
    },
};

const SideBar = () => {
    return (
        <Box {...styles.wrapper}>
            <Box {...styles.logoWrapper}>
                <Logo stylesOverrides={styles.logo} />
            </Box>

            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </MenuItem>
            </MenuList>
        </Box>
    );
};

export default SideBar;
