import { ModesAvailable } from "@granity/engine/App/Editor/_actions/editorTypes";
import useEditor from "@granity/engine/App/Editor/_actions/hooks/useEditor";
import { useAccordionDefaultOpened } from "@granity/engine/Theme/hooks/accordion";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@granity/ui";
import { FC } from "react";

const EditorModeSelector: FC = () => {
    const { selectMode } = useEditor();
    const openedAccordion = useAccordionDefaultOpened();

    const handleChange = (event: SelectChangeEvent) => {
        selectMode(event.target.value as ModesAvailable);
    };

    return (
        <Accordion {...openedAccordion}>
            <AccordionSummary>Mode</AccordionSummary>
            <AccordionDetails>
                <Select onChange={handleChange} defaultValue={ModesAvailable.Translate}>
                    <MenuItem value="translate">Translate</MenuItem>
                    <MenuItem value="rotate">Rotate</MenuItem>
                    <MenuItem value="scale">Scale</MenuItem>
                </Select>
            </AccordionDetails>
        </Accordion>
    );
};

export default EditorModeSelector;
