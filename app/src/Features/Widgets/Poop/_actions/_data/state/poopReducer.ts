import createWidgetReducer from "@app/Widgets/_actions/utilities/createWidgetReducer";

export interface PoopState {
    score: number;
    isAlive: boolean;
}

const initialState: PoopState = {
    score: 0,
    isAlive: true,
};

export const poopSlice = createWidgetReducer({
    name: "poop",
    initialState,
    reducers: {
        addPoint: (state) => {
            state.score++;
        },
        killPoop: (state) => {
            state.isAlive = false;
        },
    },
});

export const { addPoint, killPoop } = poopSlice.actions;

export default poopSlice;
