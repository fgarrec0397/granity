import { Vector3Array } from "@app/Common/commonTypes";
import { uidGenerator } from "@app/Common/utilities";

import { ToiletsArray, ToiletsChunkModel } from "../toiletsTypes";
import createToilets from "./createToilets";

export default (toiletsPositions?: ToiletsArray<Vector3Array>): ToiletsChunkModel => {
    const id = uidGenerator();

    return {
        id,
        canBeDeleted: false,
        toilets: createToilets(id, toiletsPositions),
    };
};
