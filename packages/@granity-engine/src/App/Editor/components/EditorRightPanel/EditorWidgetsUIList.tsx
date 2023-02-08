import { Box, BoxProps, Button, ButtonProps, pxToRem } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@granity-engine/App/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@granity-engine/App/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
} from "@granity-engine/App/Widgets/_actions/widgetsTypes";
import { FC } from "react";
import { css } from "styled-components";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";

type EditorWidgetsUIListStyles = {
    widgetButton?: ButtonProps;
    itemWrapper?: BoxProps;
};

const styles: EditorWidgetsUIListStyles = {
    widgetButton: {
        sx: {
            minHeight: pxToRem(105),
            border: 1,

            // "&:hover": {
            //     backgroundColor: getColor("common.backgroundLight"),
            // },
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

const EditorWidgetsUIList: FC = () => {
    const { addWidget, displayWidgetName, widgetsUI, removeWidget } = useWidgets();
    const { widgetsUIModules } = useWidgetsModules();

    const handleClickMenuItem = (widget: WidgetDictionaryItem): void => {
        addWidget(widget);
    };

    const handleClickRemove = (widgetId: string) => {
        removeWidget(widgetId);
    };

    return (
        <EditorItemsList<WidgetDictionary>
            itemsDictionary={widgetsUI}
            title="UI Widgets"
            noItemsText="No UI widget on the scene."
            triggerButtonText="Add UI Widget"
            editModal={(row) => <EditWidgetModal widget={widgetsUI[row.id]} iconWidth={12} />}
            displayItemName={displayWidgetName}
            handleClickRemove={handleClickRemove}
            // cancelButton={{
            //     text: "Cancel and close",
            // }}
        >
            {/* {(state) => (
                <Box {...styles.itemWrapper}>
                    {widgetsUIModules.length > 0
                        ? widgetsUIModules.map((widget, index) => {
                              const key = `${index}-${widget.name}`;
                              const newWidget: WidgetDictionaryItem =
                                  mapWidgetModuleToWidgetDictionary(widget);

                              return (
                                  <Button
                                      styleType="none"
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
                        : "No UI widget available."}
                </Box>
            )} */}
        </EditorItemsList>
    );
};

export default EditorWidgetsUIList;
