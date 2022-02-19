// @ts-ignore
import * as THREE from "three";
import React, { FC, createContext, useState, Dispatch, SetStateAction } from "react";

export interface MeshContextModel {
    meshes: THREE.Mesh[] | [];
    setMeshes?: (() => void) | Dispatch<SetStateAction<THREE.Mesh[] | []>>;
}

export const defaultContext: MeshContextModel = {
    meshes: [],
};

export const MeshContext = createContext<MeshContextModel>(defaultContext);

const EditorContextProvider: FC = ({ children }) => {
    const [meshes, setMeshes] = useState<THREE.Mesh[]>([]);

    return (
        <MeshContext.Provider
            value={{
                meshes,
                setMeshes,
            }}
        >
            {children}
        </MeshContext.Provider>
    );
};

export default EditorContextProvider;
