import { useContext } from "react";
import {
  EditorContext,
  EditorContextModel,
} from "../../context/EditorContextProvider";

export default (): EditorContextModel => {
  return useContext(EditorContext);
};
