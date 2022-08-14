import { saveScene } from "@app/Scene/_actions/_data/services";
import { useWidgets } from "@app/Widgets/_actions/hooks";
import { Button } from "antd";
import { FC } from "react";

const SaveButton: FC = () => {
    const { widgets, widgetsDictionary } = useWidgets();

    const onSaveFileHanlder = async () => {
        await saveScene({ widgets, widgetsDictionary });
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
