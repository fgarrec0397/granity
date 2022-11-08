import { Vector3Array } from "@react-three/rapier";
import { renderHook } from "@testing-library/react-hooks";
import { ForwardedRef, MutableRefObject } from "react";
import * as THREE from "three";
import { Mesh, Vector3 } from "three";
import { describe, expect, it } from "vitest";

import useForwardedRef from "../useForwardedRef";
import useObjectSize from "../useObjectSize";

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const scaleFactor = new THREE.Vector3(0.8, 0.8, 0.8);

describe("useObjectSize hook", () => {
    it("should return a getSize function", () => {
        const { result } = renderHook(() => useObjectSize());

        const getSize = vi.fn((object: Mesh, scale: THREE.Vector3 | Vector3Array) => ({
            getSize: result.current.getSize(object, scale),
        }));

        // sell("apples");
        getSize(cube, scaleFactor);

        expect(getSize).toHaveReturnedWith({ getSize: new Vector3() });

        // const getSize = vi.fn(result.current.getSize(cube, scale));

        expect(result.current.getSize).toBeCallableWith(cube, scale);
    });
});
