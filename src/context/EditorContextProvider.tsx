import { Vector3 } from "@react-three/fiber";
import React, {
  FC,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

export interface EditorElementSelected {
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
  currentElement?: any;
  setCurrentElement?: (() => void) | Dispatch<SetStateAction<any>>;
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
  const [currentElement, setCurrentElement] = useState<any>();
  const [currentMode, setCurrentMode] = useState<ModesAvailable>("translate");
  const providerValue: EditorContextModel = {
    isEditing,
    setIsEditing,
    currentElement,
    setCurrentElement,
    currentMode,
    setCurrentMode,
    ...value,
  };

  useEffect(() => {
    if (getContext) getContext(providerValue);
  }, [currentElement]);

  return (
    <EditorContext.Provider value={providerValue}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContextProvider;
