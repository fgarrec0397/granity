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
    min-height: 37px;
    background-color: ${({ theme }) => theme.custom.palette.background.paperDark};

    &.Mui-expanded {
        min-height: 37px;

        .MuiAccordionSummary-content {
            margin: 12px 0;
        }
    }
`;

export const AccordionSummary: FC<LibAccordionSummaryProps> = ({ children, ...props }) => {
    return (
        <StyledAccordionSummary expandIcon={<ArrowDropDownIcon />} {...props}>
            {children}
        </StyledAccordionSummary>
    );
};

const StyledAccordionDetails = styled(AccordionDetailsLib)`
    padding: 22px 16px 22px;
`;

export const AccordionDetails: FC<LibAccordionDetailsProps> = ({ children, ...props }) => {
    return <StyledAccordionDetails {...props}>{children}</StyledAccordionDetails>;
};

export default Accordion;
