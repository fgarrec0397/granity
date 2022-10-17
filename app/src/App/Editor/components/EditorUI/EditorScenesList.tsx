import useScenes from "@app/Scenes/_actions/hooks/useScenes";
import { Button, Card, Checkbox, Input, List, Modal, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { FC, useState } from "react";

const EditorScenesList: FC = () => {
    const [isAddSceneModalOpen, setIsAddSceneModalOpen] = useState(false);
    const [sceneName, setSceneName] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const { scenes, currentSceneId, addScene, selectScene, removeScene } = useScenes();

    const handleSelect = (sceneId: string) => {
        selectScene(sceneId);
    };

    const handleRemove = (sceneId: string) => {
        removeScene(sceneId);
    };

    const handleIsDefault = (e: CheckboxChangeEvent) => {
        setIsDefault(e.target.checked);
    };

    const handleOk = () => {
        addScene(sceneName, isDefault);
        setIsAddSceneModalOpen(false);
    };

    const handleCancel = () => {
        setIsAddSceneModalOpen(false);
    };

    return (
        <Card size="small" title="Scenes">
            <List
                size="small"
                bordered
                dataSource={Object.keys(scenes || {})}
                footer={<Button onClick={() => setIsAddSceneModalOpen(true)}>Add scene</Button>}
                renderItem={(sceneId) => (
                    <List.Item>
                        <Button
                            onClick={() => handleSelect(sceneId)}
                            disabled={currentSceneId === sceneId}
                        >
                            {scenes && scenes[sceneId].name}
                        </Button>
                        <Button onClick={() => handleRemove(sceneId)}>X</Button>
                    </List.Item>
                )}
            />

            <Modal
                title="Create A Scene"
                open={isAddSceneModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Typography>Scene Name</Typography>
                <Input
                    placeholder="Enter your scene name here..."
                    onChange={(event) => setSceneName(event.target.value)}
                />
                <Checkbox onChange={handleIsDefault}>Make it default scene</Checkbox>
            </Modal>
        </Card>
    );
};

export default EditorScenesList;
