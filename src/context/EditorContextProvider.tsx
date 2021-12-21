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

export interface CurrentElementInformations {
  id: string;
  name: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
}

export type ModesAvailable = "translate" | "rotate" | "scale";

export interface EditorContextModel {
  isEditor: boolean;
  hasEditorOpened?: boolean;
  isEditing?: boolean;
  setIsEditing?: (() => void) | Dispatch<SetStateAction<boolean>>;
  currentElement?: THREE.Mesh;
  setCurrentElement?: (() => void) | Dispatch<SetStateAction<THREE.Mesh>>;
  currentElementInformations?: any;
  setCurrentElementInformations?: any;
  currentMode?: ModesAvailable;
  setCurrentMode?: (() => void) | Dispatch<SetStateAction<ModesAvailable>>;
}

interface Props {
  value?: EditorContextModel;
  getContext?: (context: EditorContextModel) => void;
}

export const defaultContext: EditorContextModel = {
  isEditor: false,
  hasEditorOpened: false,
  isEditing: false,
};

export const EditorContext = createContext<EditorContextModel>(defaultContext);

const EditorContextProvider: FC<Props> = ({
  value = defaultContext,
  getContext,
  children,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentElement, setCurrentElement] = useState<THREE.Mesh>();
  const [currentElementInformations, setCurrentElementInformations] =
    useState<any>();
  const [currentMode, setCurrentMode] = useState<ModesAvailable>("translate");
  const providerValue: EditorContextModel = {
    isEditing,
    setIsEditing,
    currentElement,
    setCurrentElement,
    currentMode,
    setCurrentMode,
    currentElementInformations,
    setCurrentElementInformations,
    ...value,
  };

  useEffect(() => {
    if (getContext) getContext(providerValue);
  }, [currentElementInformations]);

  return (
    <EditorContext.Provider value={providerValue}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
