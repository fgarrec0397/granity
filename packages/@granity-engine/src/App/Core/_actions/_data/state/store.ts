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
}

type MyAction = AnyAction;

export type ReducerManager = {
    getReducer: () => ReducersMapObject<State, MyAction>;
    add: <NewReducerState>(
        key: string,
        reducer: ReducersMapObject<NewReducerState, MyAction>
    ) => void;
    addIn: <NewReducerState>(
        key: string,
        subKey: keyof NewReducerState,
        reducer: ReducersMapObject<NewReducerState, MyAction>
    ) => void;
    remove: (key: keyof State) => void;
};

export type InjectableStore = Store<State, MyAction> & {
    reducerManager?: ReducerManager;
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

export function initStore() {
    const store: InjectableStore = configureStore({
        reducer: staticReducers,
    });

    const createReducerManager = (initialReducers: ReducersMapObject<State, MyAction>) => {
        const reducers = { ...initialReducers };

        const getReducer = () => reducers;

        const add = <NewReducerState>(
            key: string,
            reducer: ReducersMapObject<NewReducerState, MyAction>
        ) => {
            if (!key || (reducers as any)[key]) {
                return;
            }

            (reducers as any)[key] = reducer;

            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        const addIn = <NewReducerState>(
            key: string,
            subKey: keyof NewReducerState,
            reducer: ReducersMapObject<NewReducerState, MyAction>
        ) => {
            const rootReducer = reducers[key as keyof State];

            if (!rootReducer) {
                const newReducer: ReducersMapObject<unknown, any> = {
                    [subKey]: reducer,
                };

                (reducers as any)[key] = combineReducers(newReducer);
                store.replaceReducer(createReducer(reducers, staticReducers));

                return;
            }

            const newReducer: ReducersMapObject<unknown, any> = {
                ...(rootReducer as any),
                [subKey]: reducer,
            };

            (reducers as any)[key] = createReducer(newReducer, rootReducer);
            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        const remove = (key: keyof State) => {
            if (!key || !reducers[key]) {
                return;
            }

            delete reducers[key];
            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        return {
            getReducer,
            add,
            addIn,
            remove,
        };
    };

    store.reducerManager = createReducerManager(staticReducers);

    return store;
}

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
