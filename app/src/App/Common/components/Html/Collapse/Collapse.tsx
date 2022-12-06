import pxToRem from "@themes/utils/pxToRem";
import {
    Disclosure,
    DisclosureContent,
    DisclosureContentProps,
    DisclosureProps,
    useDisclosureState,
} from "ariakit";
import { FC, ReactNode } from "react";
import styled from "styled-components";

import { BaseStyles } from "../htmlTypes";
import AppStyledWrapper, { StyledWrapperProps } from "../StyledWrapper";

export type CollapseStylesProps = BaseStyles & {
    wrapperStyles?: StyledWrapperProps;
};

export type CollapseComponentsProps = {
    title: string;
    titleProps?: DisclosureProps;
    contentProps?: DisclosureContentProps;
};

type Props = CollapseStylesProps &
    CollapseComponentsProps & {
        children: ReactNode;
    };

const StyledWrapper = styled(AppStyledWrapper)<StyledWrapperProps>`
    border-radius: ${({ theme }) => theme.common.borderRadius.panel};
    background-color: ${({ theme }) => theme.colors.common.backgroundDarker};
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.1);

    ${(props) => props.css}
`;

const StyledCollapse = styled(Disclosure)<CollapseStylesProps>`
    padding: ${pxToRem(10, 15)};
    width: 100%;
    background-color: ${({ theme }) => theme.colors.common.backgroundDarker};
    font-size: ${({ theme }) => theme.typography.size.smaller};
    font-weight: ${({ theme }) => theme.typography.weight.bold};
    text-align: left;
    border: none;
    border-bottom: ${pxToRem(1)} solid ${({ theme }) => theme.colors.common.border};
    border-top-left-radius: ${({ theme }) => theme.common.borderRadius.panel};
    border-top-right-radius: ${({ theme }) => theme.common.borderRadius.panel};
    cursor: pointer;
`;

const StyledCollapseContent = styled(DisclosureContent)<CollapseStylesProps>``;

const Collapse: FC<Props> = ({ children, contentProps, title, titleProps }) => {
    const disclosure = useDisclosureState();

    const mergedTitleProps: DisclosureProps = {
        ...titleProps,
        state: disclosure,
    };

    const mergedContentProps: DisclosureContentProps = {
        ...contentProps,
        state: disclosure,
    };

    return (
        <StyledWrapper>
            <StyledCollapse {...mergedTitleProps}>{title}</StyledCollapse>
            <StyledCollapseContent {...mergedContentProps}>{children}</StyledCollapseContent>
        </StyledWrapper>
    );
};

export default Collapse;
