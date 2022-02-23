// @ts-ignore
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ServicesTypes } from "../../../../app/ServicesFactory";
import useServicesFactory from "../../../../app/useServicesFactory";
import uidGenerator from "../../../../common/utils/uidGenerator";
import { addElementOnScene } from "../editorReducer";
import { SceneElement } from "../types";
import useAddElement from "./useAddElement";
import useCurrentElement from "./useCurrentElement";
import useElementsOnScene from "./useElementsOnScene";
import useRemoveElement from "./useRemoveElement";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

export default () => {
    const addElement = useAddElement();
    const { setElementsOnScene } = useElementsOnScene();
    const dispatch = useAppDispatch();
    const { elementsOnScene } = useAppSelector((state) => state.editor);
    const id = uidGenerator();

    return (group: THREE.Mesh, elementsToGroup: SceneElement[]) => {
        addElement("group", {
            id,
            meshuuid: group.uuid,
            meshId: group.id,
            name: "group",
            component: "group",
            isSelected: false,
            position: group.position,
            rotation: group.rotation,
            scale: group.scale,
        });

        elementsToGroup.forEach((x) => {
            const element = {
                ...x,
                groupId: group.uuid,
            };

            setElementsOnScene(element);
        });

        // dispatch(setElementsOnScene(elements));
    };
};
