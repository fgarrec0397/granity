import { CurrentElementInformations } from "../context/EditorContextProvider";

export default (currentObj: any): CurrentElementInformations => {
  return {
    id: currentObj?.uuid,
    name: currentObj?.geometry.type,
    position: [
      currentObj?.position.x,
      currentObj?.position.y,
      currentObj?.position.z,
    ],
    rotation: [
      currentObj?.rotation.x,
      currentObj?.rotation.y,
      currentObj?.rotation.z,
    ],
    scale: [currentObj?.scale.x, currentObj?.scale.y, currentObj?.scale.z],
  };
};
