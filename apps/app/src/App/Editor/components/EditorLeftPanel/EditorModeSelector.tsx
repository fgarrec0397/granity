import { ModesAvailable } from "@app/Editor/_actions/editorTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { FC } from "react";
import { Collapse, Select } from "ui-granity";

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
