import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { SceneCamera } from "@app/Scene/sceneTypes";

export interface CamerasContextModel {
    cameras: SceneCamera[];
    setCameras: (() => void) | Dispatch<SetStateAction<SceneCamera[]>>;
    currentCameraIndex: number;
    setCurrentCameraIndex: (() => void) | Dispatch<SetStateAction<number>>;
}

export const defaultContext: CamerasContextModel = {
    cameras: [],
    setCameras: () => {},
    currentCameraIndex: 0,
    setCurrentCameraIndex: () => {},
};

export const CamerasContext = createContext<CamerasContextModel>(defaultContext);

const CamerasContextProvider: FC = ({ children }) => {
    const [cameras, setCameras] = useState<SceneCamera[]>([]);
    const [currentCameraIndex, setCurrentCameraIndex] = useState<number>(0);

    const providerValue: CamerasContextModel = {
        cameras,
        setCameras,
        currentCameraIndex,
        setCurrentCameraIndex,
    };

    return <CamerasContext.Provider value={providerValue}>{children}</CamerasContext.Provider>;
};

export default CamerasContextProvider;
