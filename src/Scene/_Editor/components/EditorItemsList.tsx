import { Card, List } from "antd";
import React, { FC } from "react";
import useEditableProxies from "../state/hooks/useEditableProxies";

const EditorItemsList: FC = () => {
    const { editableProxies } = useEditableProxies();

    return (
        <Card size="small" title="Elements on scene">
            <List
                size="small"
                bordered
                dataSource={editableProxies}
                renderItem={(item) => <List.Item>{item.name}</List.Item>}
            />
        </Card>
    );
};

export default EditorItemsList;
