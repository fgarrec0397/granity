import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";
import { css } from "styled-components";
import { boxStyles, StyledWrapper, StyledWrapperProps, Typography } from "ui-granity";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";

type EditorSelectedWidgetStyles = {
    wrapper?: StyledWrapperProps;
};

const styles: EditorSelectedWidgetStyles = {
    wrapper: {
        css: css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            ${boxStyles()}
        `,
    },
};

const EditorSelectedWidget: FC = () => {
    const { displayWidgetName, selectedWidgets } = useWidgets();

    return (
        <StyledWrapper {...styles.wrapper}>
            {selectedWidgets.length ? (
                <>
                    <Typography>{displayWidgetName(selectedWidgets[0].id)}</Typography>
                    <EditWidgetModal widget={selectedWidgets[0]} />
                </>
            ) : (
                <Typography>No widget selected</Typography>
            )}
        </StyledWrapper>
    );
};

export default EditorSelectedWidget;
