import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { FC, useEffect } from "react";
import Layouts from "./Components/Layouts";

const App: FC = () => {
  useEffect(() => {
    console.log("useEffect");
    window.addEventListener("scroll", (event) => {
      console.log(event);
    });
  }, []);
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 30 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -10]} />
      <Layouts />
      <OrbitControls
        addEventListener={undefined}
        hasEventListener={undefined}
        removeEventListener={undefined}
        dispatchEvent={undefined}
      />
    </Canvas>
  );
};

export default App;
