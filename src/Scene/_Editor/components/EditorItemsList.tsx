import { Card, List } from "antd";
import React, { FC } from "react";
import useElementsOnScene from "../state/hooks/useElementsOnScene";

const EditorItemsList: FC = () => {
  const { elementsOnScene } = useElementsOnScene();

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
