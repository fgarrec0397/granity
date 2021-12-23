import { Card, List } from "antd";
import React, { FC, useContext, useEffect } from "react";
import { EditorContext } from "../../context/EditorContextProvider";

const EditorItemsList: FC = () => {
  const { currentElement, elementsOnScene } = useContext(EditorContext);

  useEffect(() => {
    console.log(elementsOnScene, "elementsOnScene");
    console.log(currentElement, "currentElement");
  }, [elementsOnScene]);

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
