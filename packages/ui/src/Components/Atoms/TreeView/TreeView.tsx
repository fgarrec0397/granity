import TreeItemLib, { TreeItemProps as LibTreeItemProps } from "@mui/lab/TreeItem";
import TreeViewLib, { TreeViewProps as LibTreeViewProps } from "@mui/lab/TreeView";
import { FC } from "react";

export type TreeViewProps = LibTreeViewProps;
export type TreeItemProps = LibTreeItemProps;

const TreeView: FC<TreeViewProps> = ({ children, ...props }) => {
    return <TreeViewLib {...props}>{children}</TreeViewLib>;
};

export const TreeItem: FC<TreeItemProps> = ({ children, ...props }) => {
    return <TreeItemLib {...props}>{children}</TreeItemLib>;
};

export default TreeView;
