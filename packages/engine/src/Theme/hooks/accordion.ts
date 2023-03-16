import { AccordionProps } from "@granity/ui";
import { useState } from "react";

export const useAccordionDefaultOpened = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleAccordionClick = () => {
        setIsOpen(!isOpen);
    };

    return {
        expanded: isOpen,
        onChange: handleAccordionClick,
    } as Partial<AccordionProps>;
};
