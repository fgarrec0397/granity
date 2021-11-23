import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { FC, useRef } from "react";
import { ThemeProvider } from "styled-components";
import Layouts, { feedPostionY } from "./Components/Layouts";
import Swarms from "./Components/Swarms";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";

const Lights: FC = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        intensity={2}
        position={[2, 2, 0]}
        color="white"
        // distance={5}
      />
      <directionalLight
        intensity={2}
        position={[2, -2, 0]}
        color="white"
        // distance={5}
      />
      <spotLight intensity={4} position={[-5, 10, 2]} angle={0.2} castShadow />
      <spotLight
        intensity={2}
        position={[-5, -10, 2]}
        angle={-0.2}
        castShadow
      />
    </>
  );
};

const App: FC = () => {
  return (
    <ThemeProvider theme={baseTheme}>
      <Canvas camera={{ fov: 30, position: [0, 0, 5] }}>
        <Lights />
        <Layouts />
        <Swarms />
        {/* <OrbitControls
          addEventListener={undefined}
          hasEventListener={undefined}
          removeEventListener={undefined}
          dispatchEvent={undefined}
        /> */}
      </Canvas>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
