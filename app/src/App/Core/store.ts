import editorReducer, { EditorState } from "@app/Editor/_actions/_data/state/editorReducer";
import { FeaturesState } from "@features/collector";
import featuresReducer from "@features/featuresReducer";
import widgetsReducer, { WidgetsState } from "@widgets/_actions/_data/state/widgetsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    createStore,
    Reducer,
    ReducersMapObject,
    Store,
} from "redux";
import thunk from "redux-thunk";

interface State {
    editor: EditorState;
    widgets: WidgetsState;
    features: FeaturesState;
}

type MyAction = AnyAction;

export type InjectableStore = Store<State, MyAction> & {
    injectReducer?: (featuresReducer: Reducer<FeaturesState, MyAction>) => void;
    asyncReducers?: Partial<ReducersMapObject<State, MyAction>>;
};

/**
 * mapping of State properties to their reducers
 */
const staticReducers: ReducersMapObject<State, MyAction> = {
    editor: editorReducer,
    widgets: widgetsReducer,
    features: featuresReducer,
};

/**
 * Create a store which has a function to inject a pageReducer
 */
const initStore = (): InjectableStore => {
    const store: InjectableStore = createStore(createReducer(), applyMiddleware(thunk));

    store.asyncReducers = {};
    store.injectReducer = (asyncReducer: Reducer<FeaturesState, MyAction>) => {
        store.asyncReducers = {
            ...store.asyncReducers,
            features: asyncReducer,
        };
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
};

export const store = initStore();

/**
 * combines the original static reducers with all of the reducer overrides
 */
function createReducer(asyncReducers: Partial<ReducersMapObject<State, MyAction>> = {}) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* Use throughout your app instead of plain `useDispatch` and `useSelector` */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
