import AddCircle from "@granity/icons/AddCircle";
import DefaultImage from "@granity/icons/DefaultImage";
import Folder from "@granity/icons/Folder";
import MoreVert from "@granity/icons/MoreVert";
import {
    Box,
    BoxProps,
    ButtonBase,
    ButtonBaseProps,
    IconButton,
    IconButtonProps,
    InputLabel,
    InputLabelProps,
    Menu,
    MenuItem,
    SvgIconProps,
    Typography,
    TypographyProps,
} from "@ui/components/atoms";
import { Theme } from "@ui/theme/ThemeProvider";
import pxToRem from "@ui/theme/utilities/pxToRem";
import { ChangeEventHandler, FC, MouseEvent, MouseEventHandler, useMemo, useState } from "react";

export type FileItem = {
    path: string;
    name: string;
    type: string;
};

export type FileManagerItemType = "file" | "folder" | "addFile" | "addFolder";

export type FileManagerItemOption = {
    name: string;
    onClick: (item: FileItem) => void;
};

export type FileManagerItemProps = {
    item?: FileItem;
    isSelected?: boolean;
    type?: FileManagerItemType;
    options?: FileManagerItemOption[];
    onClick?: MouseEventHandler;
    onInputFileChange?: ChangeEventHandler<HTMLInputElement>;
};

export type FileManagerItemStyles = {
    itemButton?: (isFile?: boolean) => BoxProps;
    selectedItemButton?: (isFile?: boolean) => BoxProps;
    itemName?: TypographyProps;
    itemButtonIcon?: SvgIconProps;
    itemActionButton?: IconButtonProps;
    addItemButton?: (isFile?: boolean) => ButtonBaseProps;
    addIcon?: SvgIconProps;
    fileBoxInfo?: BoxProps;
};

const itemButtonStyles = (isFile?: boolean) => {
    const baseStyles = {
        height: "100%",
        width: "100%",
        border: 1,
        fontSize: 16,
        cursor: "pointer",

        "&:hover": {
            backgroundColor: "action.hover",
        },
    };

    const itemStyles = isFile
        ? {
              display: "block",
              padding: pxToRem(5),
          }
        : {
              display: "flex",
              alignItems: "center",
              padding: pxToRem(8, 16),
          };

    return {
        ...baseStyles,
        ...itemStyles,
    };
};

const addButtonStyles = (theme: Theme, isFile?: boolean) => {
    const baseStyles = {
        display: "flex",
        color: theme.palette.text.primary,
        cursor: "pointer",

        alignItems: "center",
        justifyContent: "center",
    };

    const itemStyles = isFile
        ? {
              justifyContent: "center",
          }
        : {
              justifyContent: "flex-start",
          };

    return {
        ...itemButtonStyles(isFile),
        ...baseStyles,
        ...itemStyles,
    };
};

const styles: FileManagerItemStyles = {
    itemButton: (isFile) => ({
        sx: itemButtonStyles(isFile),
    }),
    selectedItemButton: (isFile) => ({
        sx: {
            ...itemButtonStyles(isFile),
            fontWeight: "bold",
            backgroundColor: "background.paperLight",

            "&:hover": {
                backgroundColor: "background.paperLight",
            },
        },
    }),
    addItemButton: (isFile) => ({
        sx: (theme) => ({
            ...addButtonStyles(theme, isFile),
        }),
    }),
    itemName: {
        noWrap: true,
        textAlign: "left",
        sx: {
            flexGrow: 1,
        },
    },
    itemButtonIcon: {
        sx: {
            marginRight: pxToRem(16),
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

const FileManagerItem: FC<FileManagerItemProps> = ({
    item,
    isSelected,
    type,
    options,
    onClick,
    onInputFileChange,
}) => {
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const isMoreOptionsMenuOpen = useMemo(() => Boolean(anchorElement), [anchorElement]);

    const isFile = type === "file";
    const isAddFile = type === "addFile";
    const isAddFolder = type === "addFolder";

    const handleMoreOptionsMenuClose = () => {
        setAnchorElement(null);
    };

    const onClickMoreOptions: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        setAnchorElement(event.currentTarget);
    };

    const onOptionClick = (
        event: MouseEvent<HTMLLIElement>,
        onClickOption: FileManagerItemOption["onClick"],
        itemClicked: FileItem
    ) => {
        event.stopPropagation();
        onClickOption(itemClicked);
    };

    if (isAddFolder) {
        return (
            <ButtonBase {...styles.addItemButton?.(false)} onClick={onClick}>
                <AddCircle {...styles.addIcon} />
                New Folder
            </ButtonBase>
        );
    }

    if (isAddFile) {
        return (
            <InputLabel {...(styles.addItemButton?.(true) as InputLabelProps)}>
                <AddCircle {...styles.addIcon} />
                New File
                <input type="file" onChange={onInputFileChange} multiple hidden />
            </InputLabel>
        );
    }

    if (!item) {
        return null;
    }

    const moreOptionsMenuId = `moreOptionsMenu-${item.name}`;

    return (
        <Box
            {...(isSelected ? styles.selectedItemButton?.(isFile) : styles.itemButton?.(isFile))}
            onClick={onClick}
        >
            {isFile ? <DefaultImage /> : <Folder {...styles.itemButtonIcon} />}
            {isFile ? (
                <Box {...styles.fileBoxInfo}>
                    <Typography {...styles.itemName}>{item.name}</Typography>
                    <IconButton
                        onClick={(event) => onClickMoreOptions(event)}
                        aria-controls={isMoreOptionsMenuOpen ? moreOptionsMenuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={isMoreOptionsMenuOpen ? "true" : undefined}
                        {...styles.itemActionButton}
                    >
                        <MoreVert />
                    </IconButton>
                </Box>
            ) : (
                <>
                    <Typography {...styles.itemName}>{item.name}</Typography>
                    <IconButton
                        onClick={(event) => onClickMoreOptions(event)}
                        aria-controls={isMoreOptionsMenuOpen ? moreOptionsMenuId : undefined}
                        aria-haspopup="true"
                        aria-expanded={isMoreOptionsMenuOpen ? "true" : undefined}
                        {...styles.itemActionButton}
                    >
                        <MoreVert />
                    </IconButton>
                </>
            )}
            <Menu
                anchorEl={anchorElement}
                id={moreOptionsMenuId}
                open={isMoreOptionsMenuOpen}
                onClose={handleMoreOptionsMenuClose}
                onClick={handleMoreOptionsMenuClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {options?.map((x) => (
                    <MenuItem
                        key={x.name}
                        onClick={(event) => onOptionClick(event, x.onClick, item)}
                    >
                        {x.name}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default FileManagerItem;
