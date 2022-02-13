// @ts-ignore
import * as THREE from "three";
import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface SceneElementInformations {
  id: string;
  name: string;
  component: string;
  position?: THREE.Vector3;
  rotation?: THREE.Vector3;
  scale?: THREE.Vector3;
  mesh?: THREE.Mesh;
}

export type ModesAvailable = "translate" | "rotate" | "scale";

export interface EditorContextModel {
  isEditor: boolean;
  hasEditorOpened?: boolean;
  isEditing?: boolean;
  setIsEditing?: (() => void) | Dispatch<SetStateAction<boolean>>;
  currentMode?: ModesAvailable;
  setCurrentMode?: (() => void) | Dispatch<SetStateAction<ModesAvailable>>;
  currentElement?: SceneElementInformations;
  setCurrentElement?:
    | (() => void)
    | Dispatch<SetStateAction<SceneElementInformations | undefined>>;
  elementsOnScene?: SceneElementInformations[] | [];
  setElementsOnScene?:
    | (() => void)
    | Dispatch<SetStateAction<SceneElementInformations[] | []>>;
}

export const defaultContext: EditorContextModel = {
  isEditor: false,
  hasEditorOpened: false,
  isEditing: false,
};

export const EditorContext = createContext<EditorContextModel>(defaultContext);

interface Props {
  value?: EditorContextModel;
  getContext?: (context: EditorContextModel) => void;
}

const EditorContextProvider: FC<Props> = ({
  value = defaultContext,
  getContext,
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentElement, setCurrentElement] = useState<THREE.Mesh>();
  const [currentMode, setCurrentMode] = useState<ModesAvailable>("translate");
  const [elementsOnScene, setElementsOnScene] = useState<
    SceneElementInformations[]
  >([]);

  const providerValue: EditorContextModel = {
    isEditing,
    setIsEditing,
    currentMode,
    setCurrentMode,
    currentElement,
    setCurrentElement,
    elementsOnScene,
    setElementsOnScene,
    ...value,
  };

  useEffect(() => {
    if (getContext) getContext(providerValue);
  }, [currentElement, elementsOnScene, value.isEditor]);

  return (
    <EditorContext.Provider value={providerValue}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
