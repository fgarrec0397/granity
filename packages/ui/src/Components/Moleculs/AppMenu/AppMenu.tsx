import { pxToRem } from "@ui/theme";
import { FC, ReactNode, useState } from "react";

import {
    Box,
    BoxProps,
    IconButton,
    IconButtonProps,
    ListItemIcon,
    Menu,
    MenuItem,
    PaperProps,
    Tooltip,
} from "../../atoms";

export type AppMenuListModel = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
};

export type AppMenuProps = {
    title: string;
    id: string;
    icon: ReactNode;
    subIcon?: ReactNode;
    disabled?: boolean;
    menuItems?: AppMenuListModel[];
};

export type AppMenuStyles = {
    menuPaper?: PaperProps;
    iconButton?: IconButtonProps;
    subIconWrapper?: BoxProps;
};

const styles: AppMenuStyles = {
    menuPaper: {
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
    },
    iconButton: {
        size: "large",
        color: "inherit",
        sx: {
            padding: pxToRem(6),
        },
    },
    subIconWrapper: {
        sx: {
            position: "absolute",
            bottom: pxToRem(7),
            right: pxToRem(7),
            display: "flex",
        },
    },
};

const AppMenu: FC<AppMenuProps> = ({ title, id, icon, subIcon, menuItems, disabled }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!menuItems?.length) {
        return null;
    }

    return (
        <>
            <Tooltip title={title}>
                <>
                    <IconButton
                        onClick={handleClick}
                        aria-controls={open ? id : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        {...styles.iconButton}
                        disabled={disabled}
                    >
                        {icon}
                        {subIcon && <Box {...styles.subIconWrapper}>{subIcon}</Box>}
                    </IconButton>
                </>
            </Tooltip>
            {menuItems?.length ? (
                <Menu
                    anchorEl={anchorEl}
                    id={id}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={styles.menuPaper}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    {menuItems.map((x) => (
                        <MenuItem key={x.text} onClick={x.onClick}>
                            {x.icon && <ListItemIcon>{x.icon}</ListItemIcon>}
                            {x.text}
                        </MenuItem>
                    ))}
                </Menu>
            ) : null}
        </>
    );
};

export default AppMenu;
