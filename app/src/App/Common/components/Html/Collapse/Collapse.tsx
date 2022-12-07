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
import styled, { css } from "styled-components";

import { BaseStyles } from "../htmlTypes";
import Arrow from "../Icons/Arrow";
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

const baseCollapseStyles = () => css`
    padding: ${pxToRem(10, 15)};
    width: 100%;
    background-color: ${getColor("common.backgroundDarker")};
    font-size: ${getTypography("size.smaller")}
    font-weight: ${getTypography("weight.bold")};
    text-align: left;
`;

const StyledCollapse = styled(Disclosure)<CollapseStylesProps>`
    ${baseCollapseStyles()}
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    border-bottom: ${pxToRem(1)} solid ${getColor("common.border")};
    border-top-left-radius: ${getCommon("borderRadius.panel")};
    border-top-right-radius: ${getCommon("borderRadius.panel")};
    cursor: pointer;

    &[aria-expanded="false"] {
        border-bottom-left-radius: ${getCommon("borderRadius.panel")};
        border-bottom-right-radius: ${getCommon("borderRadius.panel")};
    }
`;

const StyledCollapseContent = styled(DisclosureContent)<CollapseStylesProps>`
    ${baseCollapseStyles()}
    border-bottom-left-radius: ${getCommon("borderRadius.panel")};
    border-bottom-right-radius: ${getCommon("borderRadius.panel")};
`;

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
            <StyledCollapse {...mergedTitleProps}>
                {title}
                <Arrow />
            </StyledCollapse>
            <StyledCollapseContent {...mergedContentProps}>{children}</StyledCollapseContent>
        </StyledWrapper>
    );
};

export default Collapse;
