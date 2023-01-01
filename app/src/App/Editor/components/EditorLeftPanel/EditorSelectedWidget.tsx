import { Typography } from "@app/Common/components/Html";
import Box, { BoxStyles } from "@app/Common/components/Html/Box/Box";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import { FC } from "react";
import { css } from "styled-components";

import EditWidgetModal from "../EditorCommon/EditWidgetModal";

type EditorSelectedWidgetStyles = {
    box?: BoxStyles;
};

const styles: EditorSelectedWidgetStyles = {
    box: {
        wrapper: {
            css: css`
                display: flex;
                align-items: center;
                justify-content: space-between;
            `,
        },
    },
};

const EditorSelectedWidget: FC = () => {
    const { displayWidgetName, selectedWidgets } = useWidgets();

    return (
        <Box styling={styles.box}>
            {selectedWidgets.length ? (
                <>
                    <Typography>{displayWidgetName(selectedWidgets[0].id)}</Typography>
                    <EditWidgetModal widget={selectedWidgets[0]} />
                </>
            ) : (
                <Typography>No widget selected</Typography>
            )}
        </Box>
    );
};

export default EditorSelectedWidget;
