import { Box, BoxProps, pxToRem } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@granity-engine/App/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@granity-engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { WidgetDictionaryItem } from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";
import EditorItemsListModalButton from "./EditorItemsListModalButton";

type EditorWidgetsUIListStyles = {
    itemWrapper?: BoxProps;
};

const styles: EditorWidgetsUIListStyles = {
    itemWrapper: {
        sx: {
            display: "grid",
            gap: pxToRem(20),
            gridTemplateColumns: "repeat(4, 1fr)",
        },
    },
};

const EditorWidgetsUIList: FC = () => {
    const { addWidget, displayWidgetName, widgetsUI, widgetsUIIds, removeWidget } = useWidgets();
    const { widgetsUIModules } = useWidgetsModules();

    const handleClickMenuItem = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
    };

    const handleClickRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <EditorItemsList
            itemsDictionaryIds={widgetsUIIds}
            title="UI Widgets"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add UI Widget"
            editModal={(id) => <EditWidgetModal widget={widgetsUI[id]} />}
            displayItemName={displayWidgetName}
            handleClickRemove={handleClickRemove}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {(state) => (
                <Box {...styles.itemWrapper}>
                    {widgetsUIModules.length > 0
                        ? widgetsUIModules.map((widget, index) => {
                              const key = `${index}-${widget.name}`;
                              const newWidget: WidgetDictionaryItem =
                                  mapWidgetModuleToWidgetDictionary(widget);

                              return (
                                  <EditorItemsListModalButton
                                      key={key}
                                      buttonText={widget.name}
                                      onClick={() => {
                                          handleClickMenuItem(newWidget);
                                          state.handleClose();
                                      }}
                                  />
                              );
                          })
                        : "No UI widget available."}
                </Box>
            )}
        </EditorItemsList>
    );
};

export default EditorWidgetsUIList;
