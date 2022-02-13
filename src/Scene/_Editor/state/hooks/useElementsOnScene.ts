import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setElementsOnScene } from "../editorReducer";
import { SceneElementInformations } from "../types";

export default () => {
  const dispatch = useAppDispatch();
  const { elementsOnScene } = useAppSelector((state) => state.editor);

  return {
    elementsOnScene,
    setElementsOnScene: (newElement: SceneElementInformations) => {
      dispatch(setElementsOnScene([...elementsOnScene, newElement]));
    },
  };
};
