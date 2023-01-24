import { Collapse, Select } from "@granity/ui";
import { ModesAvailable } from "@granity-engine/App/Editor/_actions/editorTypes";
import useEditor from "@granity-engine/App/Editor/_actions/hooks/useEditor";
import { FC } from "react";

const EditorModeSelector: FC = () => {
    const { selectMode } = useEditor();

    const handleChange = (value: ModesAvailable): void => {
        selectMode(value);
    };

    return (
        <Collapse title="Mode">
            <Select
                defaultValue={ModesAvailable.Translate}
                options={[
                    {
                        value: "translate",
                    },
                    {
                        value: "rotate",
                    },
                    {
                        value: "scale",
                    },
                ]}
                selectStateProps={{
                    onChange: handleChange,
                }}
            />
        </Collapse>
    );
};

export default EditorModeSelector;
