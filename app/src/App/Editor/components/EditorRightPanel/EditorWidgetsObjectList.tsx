import Button, { ButtonStylesProps } from "@app/Common/components/Html/Button/Button";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@app/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import {
    WidgetDictionary,
    WidgetDictionaryItem,
    WidgetObjectsDictionaryItem,
} from "@app/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorItemsList from "./EditorItemsList";

type EditorWidgetsObjectListStyles = {
    widgetButton?: ButtonStylesProps;
};

const styles: EditorWidgetsObjectListStyles = {
    widgetButton: {
        css: css`
            min-height: ${pxToRem(105)};
            border: ${pxToRem(1)} solid ${getColor("common.border")};
            font-size: ${getTypography("size.large")};
            font-weight: ${getTypography("weight.medium")};

            &:hover {
                background-color: ${getColor("common.backgroundLight")};
            }
        `,
    },
};

const EditorWidgetsObjectList: FC = () => {
    const { addWidget, widgetsObjects, selectWidget, selectedWidgets, removeWidget } = useWidgets();
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
            handleClickRow={handleClickRow}
            handleClickRemove={handleClickRemove}
            isActionRowSelected={(row) => widgetsObjects[row.id]?.id === selectedWidgets[0]?.id}
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {(state) =>
                widgetsObjectModules.length > 0
                    ? widgetsObjectModules.map((widget, index) => {
                          const key = `${index}-${widget.widgetDefinition.name}`;
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
                                  {widget.widgetDefinition.name}
                              </Button>
                          );
                      })
                    : "No object widget available."
            }
        </EditorItemsList>
    );
};

export default EditorWidgetsObjectList;
