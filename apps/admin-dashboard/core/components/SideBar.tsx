import {
    Box,
    BoxProps,
    HomeIcon,
    ListItemIcon,
    ListItemIconProps,
    ListItemText,
    ListItemTextProps,
    MenuItem,
    MenuItemProps,
    MenuList,
    pxToRem,
} from "@granity/ui";

import Logo, { LogoStyles } from "./Logo";

type SideBarStyles = {
    wrapper?: BoxProps;
    logoWrapper?: BoxProps;
    logo?: LogoStyles;
    menuItem?: MenuItemProps;
    listItemIcon?: ListItemIconProps;
    listItemText?: ListItemTextProps;
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
    menuItem: {
        sx: {
            paddingLeft: pxToRem(9),
            paddingRight: pxToRem(9),
            "&:not(:last-of-type)": {
                marginBottom: pxToRem(34),
            },
        },
    },
    listItemIcon: {},
    listItemText: {
        primaryTypographyProps: {
            sx: {
                fontSize: pxToRem(16),
                fontWeight: "bold",
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
                {[0, 1, 2].map((x) => (
                    <MenuItem key={x} {...styles.menuItem}>
                        <ListItemIcon {...styles.listItemIcon}>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText {...styles.listItemText}>Home</ListItemText>
                    </MenuItem>
                ))}
            </MenuList>
        </Box>
    );
};

export default SideBar;
