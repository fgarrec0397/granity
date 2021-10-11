import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import Layouts from "./Components/Layouts";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";

const App: FC = () => {
  return (
    <ThemeProvider theme={baseTheme}>
      <Canvas dpr={[1, 2]} camera={{ fov: 30 }}>
        <ambientLight intensity={0.8} />
        <pointLight intensity={0.1} />
        <pointLight intensity={0.1} />
        <rectAreaLight
          width={3}
          height={3}
          color="white"
          intensity={15}
          position={[-2, 0, 5]}
          lookAt={[0, 0, 0]}
        />
        <Layouts />
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
