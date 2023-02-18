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
import { configureStore, Slice } from "@reduxjs/toolkit";
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
        // reducer: ReducersMapObject<NewReducerState, MyAction>
        reducer: Slice
    ) => void;
    remove: (key: keyof State) => void;
};

export type InjectableStore<AdditionalState = any> = Store<State, MyAction> & {
    reducerManager?: ReducerManager;
    // asyncSubReducers?: Partial<ReducersMapObject<State, AnyAction>>;
    // asyncReducers?: Partial<ReducersMapObject<AdditionalState, MyAction>> | never;
    asyncReducers?: any;
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

    store.asyncReducers = {};

    const createReducerManager = (initialReducers: ReducersMapObject<State, MyAction>) => {
        const reducers = { ...initialReducers };
        console.log(initialReducers, "initialReducers");
        console.log(reducers, "reducers");

        const getReducer = () => reducers;

        const add = <NewReducerState>(
            key: string,
            reducer: ReducersMapObject<NewReducerState, MyAction>
        ) => {
            // console.log((reducers as any)[key], "(reducers as any)[key]");

            if (!key || (reducers as any)[key]) {
                return;
            }

            store.asyncReducers[key] = reducer;

            (reducers as any)[key] = reducer;

            console.log(store.asyncReducers[key], "store.asyncReducers[key]");

            store.replaceReducer(createReducer(reducers, staticReducers));
        };

        const addIn = <NewReducerState>(
            key: string,
            subKey: keyof NewReducerState,
            reducer: Slice
        ) => {
            const rootReducer = reducers[key as keyof State];

            if (!rootReducer) {
                const newReducer: ReducersMapObject<unknown, any> = {
                    [subKey]: reducer.reducer,
                };

                store.asyncReducers[key] = newReducer;

                (reducers as any)[key] = combineReducers(newReducer);
                store.replaceReducer(createReducer(reducers, staticReducers));
                // add(key, combineReducers(newReducer));

                return;
            }

            store.asyncReducers[key][subKey] = reducer.reducer;

            (reducers as any)[key] = combineReducers(store.asyncReducers[key]);
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
