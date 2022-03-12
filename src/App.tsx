import React, { FC, useEffect, useState } from "react";
import Loader from "./common/components/Loader";
import Canvas from "./Canvas";
import useHandleEditor from "./Scene/_Editor/state/hooks/useHandleEditor";

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
