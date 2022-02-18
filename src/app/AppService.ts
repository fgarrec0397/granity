import { AppState } from "./index";

class AppService {
    state: AppState;

    constructor(state: AppState) {
        this.state = state;
    }
}

export default AppService;
