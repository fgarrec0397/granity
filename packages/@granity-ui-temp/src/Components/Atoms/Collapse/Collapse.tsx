import { HasChildren } from "@granity/helpers";
import {
    Disclosure,
    DisclosureContent,
    DisclosureContentProps,
    DisclosureProps,
    DisclosureState,
    useDisclosureState,
} from "ariakit";
import { FC } from "react";
import styled, { css } from "styled-components";

import { boxStyles } from "../../../Themes/mixins/box";
import { getColor, getCommon } from "../../../Themes/utils";
import getTypography from "../../../Themes/utils/getTypography";
import pxToRem from "../../../Themes/utils/pxToRem";
import { BaseStyles } from "../../../types";
import Arrow from "../Icons/Arrow";
import AppStyledWrapper, { StyledWrapperProps } from "../StyledWrapper/StyledWrapper";

export type CollapseStylesProps = BaseStyles & {
    wrapperStyles?: StyledWrapperProps;
};

export type CollapseComponentsProps = {
    title: string;
    titleProps?: DisclosureProps;
    disclosureState?: DisclosureState;
    contentProps?: DisclosureContentProps;
};

type Props = CollapseStylesProps & CollapseComponentsProps & HasChildren;

const baseCollapseStyles = () => css`
    padding: ${pxToRem(10, 15)};
    width: 100%;
    color: ${getColor("common.text")};
    font-size: ${getTypography("size.smaller")}
    font-weight: ${getTypography("weight.bold")};
    text-align: left;
`;

const StyledWrapper = styled(AppStyledWrapper)<StyledWrapperProps>`
    ${boxStyles()}
    padding: ${pxToRem(0)};

    ${(props) => props.css}
`;

const StyledCollapse = styled(Disclosure)<CollapseStylesProps>`
    ${baseCollapseStyles()}
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${getColor("common.backgroundDark")};
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
    background-color: ${getColor("common.background")};
    border-bottom-left-radius: ${getCommon("borderRadius.panel")};
    border-bottom-right-radius: ${getCommon("borderRadius.panel")};
`;

const Collapse: FC<Props> = ({ children, contentProps, disclosureState, title, titleProps }) => {
    const disclosure = useDisclosureState({ defaultOpen: true, ...disclosureState });

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
