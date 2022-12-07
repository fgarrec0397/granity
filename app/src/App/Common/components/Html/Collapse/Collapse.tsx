import { getColor, getCommon } from "@themes/utils";
import getTypography from "@themes/utils/getTypography";
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
    border-radius: ${getCommon("borderRadius.panel")};
    background-color: ${getColor("common.backgroundDarker")};
    box-shadow: ${getCommon("boxShadow.main")};

    ${(props) => props.css}
`;

const StyledCollapse = styled(Disclosure)<CollapseStylesProps>`
    padding: ${pxToRem(10, 15)};
    width: 100%;
    background-color: ${getColor("common.backgroundDarker")};
    font-size: ${getTypography("size.smaller")}
    font-weight: ${getTypography("weight.bold")};
    text-align: left;
    border: none;
    border-bottom: ${pxToRem(1)} solid ${getColor("common.border")};
    border-top-left-radius: ${getCommon("borderRadius.panel")};
    border-top-right-radius: ${getCommon("borderRadius.panel")};
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
