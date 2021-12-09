import { Canvas } from "@react-three/fiber";
import React, { FC, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import Layouts from "./Components/Layouts";
import Swarms from "./Components/Swarms";
import GlobalStyle from "./theme/globalStyle";
import baseTheme from "./theme/baseTheme";
import Loader from "./Components/Loader";

const Lights: FC = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight intensity={2} position={[2, 2, 0]} color="white" />
      <directionalLight intensity={2} position={[2, -2, 0]} color="white" />
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme={baseTheme}>
      {isLoading ? (
        <Loader />
      ) : (
        <Canvas
          camera={{ fov: 20, zoom: 0.66, position: [0, 0, 5] }}
          raycaster={{
            computeOffsets: ({ clientX, clientY }: any) => ({
              offsetX: clientX,
              offsetY: clientY,
            }),
          }}
        >
          <Lights />
          <Layouts />
          <Swarms />
        </Canvas>
      )}
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
