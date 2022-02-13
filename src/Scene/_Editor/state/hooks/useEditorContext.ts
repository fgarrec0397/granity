import { useContext } from "react";
import { EditorContext, EditorContextModel } from "../EditorContextProvider";

export default (): EditorContextModel => {
  return useContext(EditorContext);
};
