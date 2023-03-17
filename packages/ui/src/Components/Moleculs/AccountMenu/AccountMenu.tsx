import { FC, ReactNode, useState } from "react";

import { IconButton, ListItemIcon, Menu, MenuItem, PaperProps, Tooltip } from "../../Atoms";

export type AccountMenuListModel = {
    text: string;
    onClick: () => void;
    icon?: ReactNode;
};

export type AccountMenuProps = {
    title: string;
    id: string;
    icon: ReactNode;
    menuItems: AccountMenuListModel[];
};

export type AccountMenuStyles = {
    menuPaper?: PaperProps;
};

const styles: AccountMenuStyles = {
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
};

const AccountMenu: FC<AccountMenuProps> = ({ title, id, icon, menuItems }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title={title}>
                <IconButton
                    onClick={handleClick}
                    size="large"
                    sx={{ ml: 2 }}
                    aria-controls={open ? id : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                >
                    {icon}
                </IconButton>
            </Tooltip>
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
        </>
    );
};

export default AccountMenu;
