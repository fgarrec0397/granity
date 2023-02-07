import { Box, BoxProps, Button, ButtonProps } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@granity-engine/App/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@granity-engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectsDictionaryItem,
} from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@granity-engine/Themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";

type EditorWidgetsObjectListStyles = {
    widgetButton?: ButtonProps;
    itemWrapper?: BoxProps;
};

const styles: EditorWidgetsObjectListStyles = {
    widgetButton: {
        sx: {
            minHeight: pxToRem(105),
            border: 1,
            fontSize: getTypography("size.large"),
            fontWeight: getTypography("weight.medium"),

            "&:hover": {
                backgroundColor: getColor("common.backgroundLight"),
            },
        },
    },
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
        widgetsObjects,
        selectWidget,
        selectedWidgets,
        removeWidget,
    } = useWidgets();
    const { widgetsObjectModules } = useWidgetsModules();

    const handleClickMenuItem = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
    };

    const handleClickRow = (widget: WidgetDictionaryItem) => {
        selectWidget([widget as WidgetObjectsDictionaryItem]);
    };

    const handleClickRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <EditorItemsList<WidgetDictionary>
            itemsDictionary={widgetsObjects}
            title="Objects Widgets"
            noItemsText="No object widget on the scene."
            triggerButtonText="Add Object Widget"
            editModal={(row) => <EditWidgetModal widget={widgetsObjects[row.id]} iconWidth={12} />}
            displayItemName={displayWidgetName}
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(row) => widgetsObjects[row.id]?.id === selectedWidgets[0]?.id}
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
                                  <Button
                                      key={key}
                                      onClick={() => {
                                          handleClickMenuItem(newWidget);
                                          state.hide();
                                      }}
                                      {...styles.widgetButton}
                                  >
                                      {widget.name}
                                  </Button>
                              );
                          })
                        : "No object widget available."}
                </Box>
            )}
        </EditorItemsList>
    );
};

export default EditorWidgetsObjectList;
