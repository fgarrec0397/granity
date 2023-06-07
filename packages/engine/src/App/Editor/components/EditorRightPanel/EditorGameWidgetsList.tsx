import { GameWidgetDictionaryItem } from "@engine/App/Game/_actions/gameTypes";
import useGameWidgets from "@engine/App/Game/_actions/hooks/useGameWidgets";
import useWidgets from "@engine/App/Widgets/_actions/hooks/useWidgets";
import mapWidgetModuleToWidgetDictionary from "@engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { Box, BoxProps, pxToRem } from "@granity/ui";
import { FC } from "react";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";
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
        updateGameWidget,
        selectGameWidget,
        selectedGameWidgets,
    } = useGameWidgets();

    const handleClickMenuItem = (widget: GameWidgetDictionaryItem): void => {
        addGameWidget(widget);
    };

    const toggleVisibilityWidget = (id: string): void => {
        if (id) {
            updateGameWidget(id, { isVisible: !gameWidgetsInfo[id].isVisible });
        }
    };

    const handleClickRow = (id: string) => {
        const widget = gameWidgets[id];
        selectGameWidget([widget as GameWidgetDictionaryItem], true);
    };

    const handleClickRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    const changeItemsHandler = (ids: string[]) => {
        updateWidgetsOrder(ids);
    };

    return (
        <EditorItemsList
            itemsDictionaryIds={gameWidgetsIds}
            title="Game Widgets"
            noItemsText="No object widget on the scene."
            triggerButtonText="Add Object Widget"
            editModal={(id) => <EditWidgetModal widget={gameWidgets[id]} />}
            isVisible={(id) => gameWidgetsInfo?.[id]?.isVisible}
            handleVisibility={toggleVisibilityWidget}
            displayItemName={displayWidgetName}
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(id) => gameWidgets[id]?.id === selectedGameWidgets[0]?.id}
            changeItemsHandler={changeItemsHandler}
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
                        : "No object widget available."}
                </Box>
            )}
        </EditorItemsList>
    );
};

export default EditorGameWidgetsList;
