import { FC } from "react";

import { ToiletsChunkModel } from "../_actions/toiletsTypes";
import ToiletColumn from "./ToiletColumn";

export type ToiletsChunkProps = {
    toiletChunk: ToiletsChunkModel;
};

const ToiletsChunk: FC<ToiletsChunkProps> = ({ toiletChunk }) => {
    return (
        <>
            {toiletChunk.toilets.map((x, index) => (
                <ToiletColumn key={index} index={index} toilet={x} />
            ))}
        </>
    );
};

export default ToiletsChunk;
