import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import useWidgetsModules from "@app/Widgets/_actions/hooks/useWidgetsModules";
import mapWidgetModuleToWidgetDictionary from "@app/Widgets/_actions/utilities/mapWidgetModuleToWidgetDictionary";
import { WidgetDictionary, WidgetDictionaryItem } from "@app/Widgets/_actions/widgetsTypes";
import { getColor, getTypography, pxToRem } from "@themes/utils";
import { FC } from "react";
import { css } from "styled-components";
import { Button, ButtonStylesProps, StyledWrapper, StyledWrapperProps } from "ui-granity";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";
import EditorItemsList from "./EditorItemsList";

type EditorWidgetsUIListStyles = {
    widgetButton?: ButtonStylesProps;
    itemWrapper?: StyledWrapperProps;
};

const styles: EditorWidgetsUIListStyles = {
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
    itemWrapper: {
        css: css`
            display: grid;
            gap: ${pxToRem(20)};
            grid-template-columns: repeat(4, 1fr);
        `,
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
            cancelButton={{
                text: "Cancel and close",
            }}
        >
            {(state) => (
                <StyledWrapper {...styles.itemWrapper}>
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
                </StyledWrapper>
            )}
        </EditorItemsList>
    );
};

export default EditorWidgetsUIList;
