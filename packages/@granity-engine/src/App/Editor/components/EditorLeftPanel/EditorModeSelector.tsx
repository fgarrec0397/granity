import { Accordion, MenuItem, Select, SelectChangeEvent } from "@granity/ui";
import { ModesAvailable } from "@granity-engine/App/Editor/_actions/editorTypes";
import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { FC } from "react";

const EditorModeSelector: FC = () => {
    const { selectMode } = useEditor();

    const handleChange = (event: SelectChangeEvent) => {
        selectMode(event.target.value as ModesAvailable);
    };

    return (
        <Accordion title="Mode">
            <Select onChange={handleChange} defaultValue={ModesAvailable.Translate}>
                <MenuItem value="translate">Translate</MenuItem>
                <MenuItem value="rotate">Rotate</MenuItem>
                <MenuItem value="Scale">Scale</MenuItem>
            </Select>
        </Accordion>
    );
};

export default EditorModeSelector;
