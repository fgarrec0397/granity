import Box, { BoxStyles } from "@app/Common/components/Html/Box/Box";
import Button from "@app/Common/components/Html/Button/Button";
import Edit from "@app/Common/components/Html/Icons/Edit";
import Modal from "@app/Common/components/Html/Modal/Modal";
import useWidgets from "@app/Widgets/_actions/hooks/useWidgets";
import displayWidgetName from "@app/Widgets/_actions/utilities/displayWidgetName";
import { FC, useState } from "react";
import { css } from "styled-components";

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
    const { selectedWidgets } = useWidgets();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Box styling={styles.box}>
            {selectedWidgets.length ? displayWidgetName(selectedWidgets[0]) : "No widget selected"}

            <Button onClick={() => setIsModalOpen(true)}>
                <Edit />
            </Button>

            <Modal
                title="Edit Widget"
                size="large"
                cancelButton={{
                    text: "Cancel and close",
                }}
                options={{
                    open: isModalOpen,
                }}
            >
                {(state) => {
                    return (
                        <Button
                            onClick={() => {
                                console.log("test");
                                state.hide();
                            }}
                        >
                            test
                        </Button>
                    );
                }}
            </Modal>
        </Box>
    );
};

export default EditorSelectedWidget;
