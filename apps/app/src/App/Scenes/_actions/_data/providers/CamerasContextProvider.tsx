import { HasChildren } from "@app/Common/commonTypes";
import { createContext, Dispatch, FC, SetStateAction, useState } from "react";

import { SceneCamera } from "../../scenesTypes";

export interface CamerasContextModel {
    cameras: SceneCamera[];
    setCameras: (() => void) | Dispatch<SetStateAction<SceneCamera[]>>;
    currentCameraId: string | null;
    setCurrentCameraId: (() => void) | Dispatch<SetStateAction<string | null>>;
}

export const defaultContext: CamerasContextModel = {
    cameras: [],
    setCameras: () => {},
    currentCameraId: null,
    setCurrentCameraId: () => {},
};

export const CamerasContext = createContext<CamerasContextModel>(defaultContext);

type Props = HasChildren;
const CamerasContextProvider: FC<Props> = ({ children }) => {
    const [cameras, setCameras] = useState<SceneCamera[]>([]);
    const [currentCameraId, setCurrentCameraId] = useState<string | null>(null);

    const providerValue: CamerasContextModel = {
        cameras,
        setCameras,
        currentCameraId,
        setCurrentCameraId,
    };

    return <CamerasContext.Provider value={providerValue}>{children}</CamerasContext.Provider>;
};

export default CamerasContextProvider;
