import { createContext, Dispatch, FC, SetStateAction, useState } from "react";
import { SceneCamera } from "../types";

export interface CamerasContextModel {
    cameras: SceneCamera[];
    setCameras: (() => void) | Dispatch<SetStateAction<SceneCamera[]>>;
}

export const defaultContext: CamerasContextModel = {
    cameras: [],
    setCameras: () => {},
};

export const CamerasContext = createContext<CamerasContextModel>(defaultContext);

const CamerasContextProvider: FC = ({ children }) => {
    const [cameras, setCameras] = useState<SceneCamera[]>([]);

    const providerValue: CamerasContextModel = {
        cameras,
        setCameras,
    };

    return <CamerasContext.Provider value={providerValue}>{children}</CamerasContext.Provider>;
};

export default CamerasContextProvider;
