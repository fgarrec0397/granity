import { EditableWidget } from "@app/Editor/_actions/editorTypes";
import createWidget from "@app/Widgets/_actions/utilities/createWidgetObject";
import { FC, useRef } from "react";
import { Mesh } from "three";

import toiletsReducer from "./_actions/_data/state/toiletsReducer";
import useToilets from "./_actions/hooks/useToilets";
import useToiletsInit from "./_actions/hooks/useToiletsInit";
import useToiletsUpdate from "./_actions/hooks/useToiletsUpdate";
import ToiletsChunk from "./components/ToiletsChunk";

export interface ToiletsProps extends EditableWidget {
    shape: string;
    color: string;
    gravityScale: number;
}

type OwnProps = ToiletsProps;

const Toilets: FC<OwnProps> = () => {
    const toiletsRef = useRef<Mesh>(null);
    const { toiletsChunks } = useToilets();

    useToiletsInit();
    useToiletsUpdate();

    return (
        <mesh ref={toiletsRef}>
            {toiletsChunks.map((x, index) => (
                <ToiletsChunk key={index} toiletChunk={x} />
            ))}
        </mesh>
    );
};

export const widget = createWidget({
    component: Toilets,
    reducer: toiletsReducer,
    widgetDefinition: {
        name: "Toilet",
    },
});
