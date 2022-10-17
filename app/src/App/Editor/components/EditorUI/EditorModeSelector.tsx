import StyledWrapper, { StyledWrapperProps } from "@app/Common/components/Html/StyledWrapper";
import { ModesAvailable } from "@app/Editor/_actions/editorTypes";
import useEditor from "@app/Editor/_actions/hooks/useEditor";
import { Card, Select } from "antd";
import { FC } from "react";
import { css } from "styled-components";

const { Option } = Select;

interface EditorFeedbackStyles {
    wrapper?: StyledWrapperProps;
}

const styles: EditorFeedbackStyles = {
    wrapper: {
        css: css`
            max-width: 300px;
            margin-right: 0.5em;
            user-select: none;
        `,
    },
};

const EditorModeSelector: FC = () => {
    const { selectMode } = useEditor();

    const handleChange = (value: ModesAvailable): void => {
        selectMode(value);
    };

    return (
        <StyledWrapper {...styles.wrapper}>
            <Card size="small" title="Mode" style={{ width: 300 }}>
                <Select
                    defaultValue={ModesAvailable.Translate}
                    style={{ width: 120 }}
                    onChange={handleChange}
                >
                    <Option value="translate">Translate</Option>
                    <Option value="rotate">Rotate</Option>
                    <Option value="scale">Scale</Option>
                </Select>
            </Card>
        </StyledWrapper>
    );
};

export default EditorModeSelector;
