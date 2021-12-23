import { Card, List } from "antd";
import React, { FC, useContext } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

const EditorItemsList: FC = () => {
  const { elementsOnScene } = useContext(EditorContext);
  return (
    <Card size="small" title="Elements on scene">
      <List
        size="small"
        bordered
        dataSource={elementsOnScene}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </Card>
  );
};

export default EditorItemsList;
