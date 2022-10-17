import { Button, Card } from "antd";
import { FC } from "react";

const GameUI: FC = () => {
    const handlePlay = () => {
        console.log("handlePlay");
    };

    return (
        <>
            <Card title="Flappy Poop" style={{ width: 300 }}>
                <Button onClick={handlePlay}>Play</Button>
            </Card>
        </>
    );
};

export default GameUI;
