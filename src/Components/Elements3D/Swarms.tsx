import { useFrame, MeshProps } from "@react-three/fiber";
import React, { FC, useMemo, useRef } from "react";
// @ts-ignore
import * as THREE from "three";

const Swarms: FC = () => {
  const count = 150;
  const mesh = useRef<MeshProps>();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 10;
      const factor = 20 + Math.random() * 100;
      const speed = 0.0005;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = Math.floor(Math.random() * (-10 - -50 + 1) + -50);
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      const { factor, speed, xFactor, yFactor, zFactor, ...restParticle } =
        particle;

      restParticle.t = particle.t += speed / 2;
      const a = Math.cos(restParticle.t) + Math.sin(restParticle.t * 1) / 10;
      const b = Math.sin(restParticle.t) + Math.cos(restParticle.t * 2) / 10;
      const s = Math.cos(restParticle.t);
      particle.mx += particle.mx * 0.01;
      particle.my += particle.my * 0.01;

      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((restParticle.t / 10) * factor) +
          (Math.sin(restParticle.t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((restParticle.t / 10) * factor) +
          (Math.cos(restParticle.t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((restParticle.t / 10) * factor) +
          (Math.sin(restParticle.t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      if (mesh.current) mesh.current.setMatrixAt(i, dummy.matrix);
    });
    if (mesh.current) mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <boxGeometry />
        <meshPhongMaterial attach="material" color="white" />
      </instancedMesh>
    </>
  );
};

export default Swarms;
