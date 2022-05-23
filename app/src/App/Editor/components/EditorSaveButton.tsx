import { Button } from "antd";
import { FC } from "react";
import { trigger } from "../../Core/utils/events";

const SaveButton: FC = () => {
    const onSaveFileHanlder = () => {
        trigger("saveFile:click");
    };

    return <Button onClick={onSaveFileHanlder}>Save</Button>;
};

export default SaveButton;
