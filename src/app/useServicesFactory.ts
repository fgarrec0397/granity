import { useAppState } from "./hooks";
import ServicesFactory, { ServicesTypes } from "./ServicesFactory";

export default (serviceType: ServicesTypes) => {
    const appState = useAppState();
    return new ServicesFactory(appState).createService(serviceType);
};
