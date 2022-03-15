import { combineReducers } from "redux";
import widgets from "../Features/collector";

console.log(widgets, "widgets from extractor");

const destructuredWidgets = () => {
    let reducers;

    widgets.forEach(({ reducer }) => {
        reducers.push(reducer);
        // reducers = combineReducers(reducer);
    });

    // const featuresReducer = combineReducers(reducers)

    return { reducers };
};

const { reducers } = destructuredWidgets();

interface Widget1 {
    test: "test";
}

interface FeaturesState {
    widget1?: Widget1;
}

export const featuresReducers = reducers;

// export default destructuredWidgets;
