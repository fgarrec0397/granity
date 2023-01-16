import { HasChildren } from "@granity/helpers";
import { pxToRem, StyledWrapper, StyledWrapperProps } from "@granity/ui";
import { FC } from "react";
import { css } from "styled-components";

type ActionItemRowStyles = {
    row?: (isSelected?: boolean) => StyledWrapperProps;
};

type ListActionsItemsProps = HasChildren & {
    onClick?: (event: MouseEvent) => void;
    isSelected?: boolean;
};

const styles: ActionItemRowStyles = {
    row: (isSelected) => {
        return {
            css: css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: ${pxToRem(5)};
                border: 1px solid transparent;
                border-radius: 4px;
                cursor: pointer;

                &:hover {
                    background-color: #424242;
                }

                ${isSelected &&
                css`
                    background-color: #424242;
                    border: 1px solid #5c5c5c;
                    cursor: default;
                `}
            `,
        } as StyledWrapperProps;
    },
};

const ActionItemRow: FC<ListActionsItemsProps> = ({ onClick, isSelected, children }) => {
    return (
        <StyledWrapper onClick={(event) => onClick?.(event)} {...styles.row?.(isSelected)}>
            {children}
        </StyledWrapper>
    );
};

export default ActionItemRow;
