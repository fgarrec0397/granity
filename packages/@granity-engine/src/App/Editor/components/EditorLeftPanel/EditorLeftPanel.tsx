import { Panel, PanelStylesProps, StyledWrapper, StyledWrapperProps } from "@granity/ui";
import useWidgets from "@granity-engine/App/Widgets/_actions/hooks/useWidgets";
import { layoutStyles } from "@granity-engine/Themes/mixins/layout";
import { pxToRem } from "@granity-engine/Themes/utils";
import { FC } from "react";
import { css } from "styled-components";

import EditorModeSelector from "./EditorModeSelector";
import EditorSelectedWidget from "./EditorSelectedWidget";
import EditorWidgetOptions from "./EditorWidgetOptions/EditorWidgetOptions";
import EditorWidgetProperties from "./EditorWidgetProperties/EditorWidgetProperties";

type EditorLeftPanelStyles = {
    wrapper: StyledWrapperProps;
    panel: PanelStylesProps;
};

const styles: EditorLeftPanelStyles = {
    wrapper: {
        css: css`
            width: 100%;
            max-width: ${pxToRem(300)};

            ${layoutStyles({ top: 110, left: 30 })}
        `,
    },
    panel: {
        wrapper: {
            css: css`
                margin-bottom: ${pxToRem(15)};

                &:last-child {
                    margin-bottom: 0;
                }
            `,
        },
    },
};

const EditorLeftPanel: FC = () => {
    const { selectedWidgets } = useWidgets();

    return (
        <StyledWrapper {...styles.wrapper}>
            <Panel {...styles.panel}>
                <EditorSelectedWidget />
            </Panel>
            <Panel {...styles.panel}>
                <EditorModeSelector />
            </Panel>
            <Panel {...styles.panel}>
                <EditorWidgetProperties />
            </Panel>
            {selectedWidgets[0] && (
                <Panel {...styles.panel}>
                    <EditorWidgetOptions />
                </Panel>
            )}
        </StyledWrapper>
    );
};

export default EditorLeftPanel;
