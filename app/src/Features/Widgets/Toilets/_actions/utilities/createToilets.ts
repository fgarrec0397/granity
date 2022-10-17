import { uidGenerator } from "@app/Common/utilities";
import { Vector3Array } from "@react-three/rapier";

import { ToiletModel, ToiletsArray, ToiletsChunkToilets } from "../toiletsTypes";

export default (toiletsChunkId: string, toiletsPositions?: ToiletsArray<Vector3Array>) => {
    const toilets: ToiletModel[] = [];

    for (let i = 0; i < 3; i++) {
        const toilet: ToiletModel = {
            id: uidGenerator(),
            toiletsChunkId,
            position: toiletsPositions ? toiletsPositions[i] : [0, 0, 0],
            isVisible: false,
        };

        toilets.push(toilet);
    }

    return toilets as ToiletsChunkToilets;
};
