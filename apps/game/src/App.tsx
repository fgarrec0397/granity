import { FC } from "react";

import useHandleGetScene from "./useHandleGetScene";

const App: FC = () => {
    useHandleGetScene();
    return <>hello world</>;
};

export default App;
