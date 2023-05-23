import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@engine/App/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import {
    WidgetDictionaryItem,
    WidgetDictionaryItem,
} from "@engine/App/Widgets/_actions/widgetsTypes";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";
import EditorItemsListModalButton from "./EditorItemsListModalButton";

type EditorWidgetsObjectListStyles = {
    itemWrapper?: BoxProps;
};

const styles: EditorWidgetsObjectListStyles = {
    itemWrapper: {
        sx: {
            display: "grid",
            gap: pxToRem(20),
            gridTemplateColumns: "repeat(4, 1fr)",
        },
    },
};

const EditorWidgetsObjectList: FC = () => {
    const {
        addWidget,
        displayWidgetName,
        widgetsObjectsIds,
        widgetsObjects,
        widgetsObjectInfoDictionary,
        updateWidget,
        selectWidget,
        selectedWidgets,
        removeWidget,
    } = useWidgets();
    const { widgetsObjectModules } = useWidgetsModules();

    const handleClickMenuItem = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
    };

    const toggleVisibilityWidget = (id: string): void => {
        if (id) {
            updateWidget(id, { isVisible: !widgetsObjectInfoDictionary[id].isVisible });
        }
    };

    const handleClickRow = (id: string) => {
        const widget = widgetsObjects[id];
        selectWidget([widget as WidgetDictionaryItem], true);
    };

    const handleClickRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <EditorItemsList
            itemsDictionaryIds={widgetsObjectsIds}
            title="Objects Widgets"
            noItemsText="No object widget on the scene."
            triggerButtonText="Add Object Widget"
            editModal={(id) => <EditWidgetModal widget={widgetsObjects[id]} />}
            isVisible={(id) => widgetsObjectInfoDictionary?.[id]?.isVisible}
            handleVisibility={toggleVisibilityWidget}
            displayItemName={displayWidgetName}
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(id) => widgetsObjects[id]?.id === selectedWidgets[0]?.id}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {(state) => (
                <Box {...styles.itemWrapper}>
                    {widgetsObjectModules.length > 0
                        ? widgetsObjectModules.map((widget, index) => {
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
                        : "No object widget available."}
                </Box>
            )}
        </EditorItemsList>
    );
};

export default EditorWidgetsObjectList;
