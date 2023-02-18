// import { FeaturesState } from "@features/Widgets" // TODO - fix that;
import { FeaturesState } from "@granity-engine/App/Core";
import editorReducer, {
    EditorState,
} from "@granity-engine/App/Editor/_actions/_data/state/editorReducer";
import gameReducer, { GameState } from "@granity-engine/App/Game/_actions/_data/state/gameReducer";
import scenesReducer, {
    ScenesState,
} from "@granity-engine/App/Scenes/_actions/_data/state/scenesReducer";
import widgetsReducer, {
    WidgetsState,
} from "@granity-engine/App/Widgets/_actions/_data/state/widgetsReducer";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, combineReducers, Reducer, ReducersMapObject, Store } from "redux";

export interface State {
    editor: EditorState;
    widgets: WidgetsState;
    scenes: ScenesState;
    game: GameState;
    // features?: FeaturesState;
}

type MyAction = AnyAction;

export type InjectableStore = Store<State, MyAction> & {
    injectReducer?: (key: string, reducer?: Reducer<State, AnyAction>) => void;
    injectFeaturesReducer?: (
        key: string,
        featuresReducer: Reducer<FeaturesState, MyAction>
    ) => void;
    asyncReducers?: Partial<ReducersMapObject<State, AnyAction>>;
    asyncFeaturesReducers?: Partial<ReducersMapObject<FeaturesState, MyAction>> | never;
};

/**
 * Mapping of State properties to their reducers
 */
const staticReducers: ReducersMapObject<State, MyAction> = {
    editor: editorReducer,
    widgets: widgetsReducer,
    scenes: scenesReducer,
    game: gameReducer,
};

/**
 * Create a store which has a function to inject a pageReducer
 */
const initStore = (): InjectableStore => {
    const store: InjectableStore = configureStore({
        reducer: staticReducers,
    });

    store.asyncReducers = {};
    store.asyncFeaturesReducers = {};

    store.injectReducer = (key, asyncReducer) => {
        if (store.asyncReducers) {
            (store.asyncReducers as any)[key] = asyncReducer;

            store.replaceReducer(createReducer(store.asyncReducers, staticReducers));
        }
    };

    store.injectFeaturesReducer = (key, asyncReducer) => {
        if (store.asyncFeaturesReducers) {
            (store.asyncFeaturesReducers as any)[key] = asyncReducer;

            store.injectReducer?.(
                "features",
                createReducer(store.asyncFeaturesReducers, staticReducers.features)
            );
        }
    };

    return store;
};

export const store = initStore();

/**
 * Combines two given reducers together.
 */
function createReducer<
    R1 extends ReducersMapObject<any, any> | Reducer<any, any>,
    R2 extends ReducersMapObject<any, any> | Reducer<any, any>
>(reducer1?: R1, reducer2?: R2): Reducer<any, any> {
    return combineReducers({
        ...reducer1,
        ...reducer2,
    });
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* Use throughout your app instead of plain `useDispatch` and `useSelector` */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;