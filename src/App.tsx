import React, { FC, useEffect, useState } from "react";
import Loader from "./App/common/components/Loader";
import Canvas from "./Canvas";
import useHandleEditor from "./App/Scene/_Editor/state/hooks/useHandleEditor";

// Test 4
const App: FC = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useHandleEditor();

    return isLoading ? <Loader /> : <Canvas />;
};

export default App;
