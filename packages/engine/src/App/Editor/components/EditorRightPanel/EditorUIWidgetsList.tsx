import useUIWidgets from "@engine/App/UI/_actions/hooks/useUIWidgets";
import { UIWidgetDictionaryItem } from "@engine/App/UI/_actions/uiTypes";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import mapWidgetModuleToWidgetDictionary from "@engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { WidgetId } from "@engine/App/Widgets/_actions/widgetsTypes";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorAccordionList from "./EditorAccordionList";
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
    const { displayWidgetName, removeWidget } = useWidgets();

    const { addUIWidget, uiWidgets, uiWidgetsIds, uiWidgetsModules } = useUIWidgets();

    const handleClickMenuItem = (widget: UIWidgetDictionaryItem): void => {
        addUIWidget(widget);
    };

    const handleClickRemove = (widgetId: WidgetId) => {
        removeWidget(widgetId);
    };

    return (
        <EditorAccordionList
            itemsDictionaryIds={uiWidgetsIds}
            title="UI Widgets"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add UI Widget"
            editModal={(id) => <EditWidgetModal widget={uiWidgets[id]} />}
            displayItemName={displayWidgetName}
            handleClickRemove={handleClickRemove}
            cancelButton={{
                text: "Cancel and close",
            }}
            isDragAndDropEnabled={false}
        >
            {(state) => (
                <Box {...styles.itemWrapper}>
                    {uiWidgetsModules.length > 0
                        ? uiWidgetsModules.map((widget, index) => {
                              const key = `${index}-${widget.name}`;
                              const newWidget: UIWidgetDictionaryItem =
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
        </EditorAccordionList>
    );
};

export default EditorWidgetsUIList;
