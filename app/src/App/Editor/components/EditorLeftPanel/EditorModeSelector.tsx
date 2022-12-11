import Collapse from "@app/Common/components/Html/Collapse/Collapse";
import Select from "@app/Common/components/Html/Select/Select";
import { ModesAvailable } from "@app/Editor/_actions/editorTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
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
