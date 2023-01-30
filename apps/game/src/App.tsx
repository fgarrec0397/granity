import { GranityGame } from "@granity/engine";
import { FC } from "react";

import useHandleGetScene from "./useHandleGetScene";

const App: FC = () => {
    useHandleGetScene();
    return <GranityGame />;
};

export default App;
