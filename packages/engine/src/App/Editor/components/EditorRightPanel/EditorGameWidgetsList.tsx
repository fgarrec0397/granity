import { WidgetId, WidgetsIds } from "@engine/api";
import { GameWidgetDictionaryItem } from "@engine/App/Game/_actions/gameTypes";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import mapWidgetModuleToWidgetDictionary from "@engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorAccordionList from "./EditorAccordionList";
import EditorItemsListModalButton from "./EditorItemsListModalButton";

type EditorGameWidgetsListStyles = {
    itemWrapper?: BoxProps;
};

const styles: EditorGameWidgetsListStyles = {
    itemWrapper: {
        sx: {
            display: "grid",
            gap: pxToRem(20),
            gridTemplateColumns: "repeat(4, 1fr)",
        },
    },
};

const EditorGameWidgetsList: FC = () => {
    const { displayWidgetName, removeWidget, updateWidgetsOrder } = useWidgets();
    const {
        addGameWidget,
        gameWidgets,
        gameWidgetsModules,
        gameWidgetsIds,
        gameWidgetsInfo,
        updateGameWidgetInfo,
        selectGameWidget,
        selectedGameWidgets,
    } = useGameWidgets();

    const handleClickMenuItem = (widget: GameWidgetDictionaryItem): void => {
        addGameWidget(widget);
    };

    const toggleVisibilityWidget = (item: WidgetId): void => {
        if (item.id) {
            updateGameWidgetInfo(item.id, { isVisible: !gameWidgetsInfo[item.id].isVisible });
        }
    };

    const handleClickRow = (id: string) => {
        const widget = gameWidgets[id];
        selectGameWidget([widget as GameWidgetDictionaryItem], true);
    };

    const handleClickRemove = (widgetId: WidgetId) => {
        removeWidget(widgetId);
    };

    const onDropItem = (newItems: WidgetsIds) => {
        updateWidgetsOrder(newItems);
    };

    return (
        <EditorAccordionList
            itemsDictionaryIds={gameWidgetsIds}
            title="Game Widgets"
            noItemsText="No game widget on the scene."
            triggerButtonText="Add Game Widget"
            editModal={(id) => <EditWidgetModal widget={gameWidgets[id]} />}
            isVisible={(item) => gameWidgetsInfo?.[item.id]?.isVisible}
            handleVisibility={toggleVisibilityWidget}
            displayItemName={displayWidgetName}
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(id) => gameWidgets[id]?.id === selectedGameWidgets[0]?.id}
            onDropItem={onDropItem}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {(state) => (
                <Box {...styles.itemWrapper}>
                    {gameWidgetsModules.length > 0
                        ? gameWidgetsModules.map((widget, index) => {
                              const key = `${index}-${widget.name}`;
                              const newWidget: GameWidgetDictionaryItem =
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
                        : "No gabe widget available."}
                </Box>
            )}
        </EditorAccordionList>
    );
};

export default EditorGameWidgetsList;
