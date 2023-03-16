import { Object3D } from "three";

export default (mesh: Object3D) => {
    return mesh.name.split("+")[2];
};
