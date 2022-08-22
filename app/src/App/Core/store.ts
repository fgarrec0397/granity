import editorReducer, { EditorState } from "@app/Editor/_actions/_data/state/editorReducer";
import gameReducer from "@app/Game/_actions/_data/state/gameReducer";
import { FeaturesState } from "@features/collector";
import featuresReducer from "@features/featuresReducer";
import { configureStore } from "@reduxjs/toolkit";
import widgetsReducer, { WidgetsState } from "@widgets/_actions/_data/state/widgetsReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, combineReducers, Reducer, ReducersMapObject, Store } from "redux";

interface State {
    editor: EditorState;
    widgets: WidgetsState;
    game: WidgetsState;
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
    game: gameReducer,
    features: featuresReducer,
};

/**
 * Create a store which has a function to inject a pageReducer
 */
const initStore = (): InjectableStore => {
    const store: InjectableStore = configureStore({
        reducer: staticReducers,
    });

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
