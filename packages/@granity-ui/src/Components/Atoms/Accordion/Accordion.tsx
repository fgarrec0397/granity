import pxToRem from "@granity-ui/Theme/utilities/pxToRem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionLib, { AccordionProps as LibAccordionProps } from "@mui/material/Accordion";
import AccordionDetailsLib, {
    AccordionDetailsProps as LibAccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import AccordionSummaryLib, {
    AccordionSummaryProps as LibAccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import { FC } from "react";

export type AccordionProps = LibAccordionProps;
export type AccordionSummaryProps = LibAccordionSummaryProps;
export type AccordionDetailsProps = LibAccordionDetailsProps;

const StyledAccordion = styled(AccordionLib)`
    &.Mui-expanded {
        margin-top: 0;
        margin-bottom: 0;

        &:before {
            opacity: 1;
        }
    }
`;

const Accordion: FC<AccordionProps> = ({ children, ...props }) => {
    return <StyledAccordion {...props}>{children}</StyledAccordion>;
};

const StyledAccordionSummary = styled(AccordionSummaryLib)`
    min-height: ${pxToRem(37)};
    background-color: ${({ theme }) => theme.custom.palette.background.paperDark};

    &.Mui-expanded {
        min-height: ${pxToRem(37)};

        .MuiAccordionSummary-content {
            margin: ${pxToRem(12)} 0;
        }
    }
`;

export const AccordionSummary: FC<AccordionSummaryProps> = ({ children, ...props }) => {
    return (
        <StyledAccordionSummary expandIcon={<ArrowDropDownIcon />} {...props}>
            {children}
        </StyledAccordionSummary>
    );
};

const StyledAccordionDetails = styled(AccordionDetailsLib)`
    padding: ${pxToRem(10)} ${pxToRem(16)} ${pxToRem(10)};
`;

export const AccordionDetails: FC<LibAccordionDetailsProps> = ({ children, ...props }) => {
    return <StyledAccordionDetails {...props}>{children}</StyledAccordionDetails>;
};

export default Accordion;
