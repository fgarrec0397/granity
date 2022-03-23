import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Core/store";
import { IWidget } from "../../../Core/_Widgets/typings";
import { setCurrentWidget } from "../editorReducer";
import { WidgetsContext } from "../WidgetsProvider";

export default () => {
    const dispatch = useAppDispatch();
    const { currentWidget } = useAppSelector((state) => state.editor);
    const { widgets, setWidgets } = useContext(WidgetsContext);

    useEffect(() => {
        console.log(widgets, "widgets");
    }, [widgets.length]);
    return {
        currentWidget,
        widgets,
        addWidget: (widget: IWidget) => {
            console.log(widget, "addWidget");

            // TODO -- Use IEditableProxy for widgets
            setWidgets([...widgets, widget]);
        },
        updateCurrentProxy: (widget: IWidget) => {
            dispatch(setCurrentWidget(widget));
        },
    };
};
