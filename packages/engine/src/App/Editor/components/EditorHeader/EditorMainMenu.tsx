import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { AccountMenu, SettingsIcon } from "@granity/ui";
import { FC } from "react";

import { useEditor } from "../../_actions/hooks";

const EditorMainMenu: FC = () => {
    const { editorMainMenu } = useConfig();
    const { isEditor } = useEditor();

    return (
        <AccountMenu
            title="Editor settings"
            id="editor-menu"
            icon={<SettingsIcon />}
            disabled={!isEditor}
            menuItems={editorMainMenu}
        />
    );
};

export default EditorMainMenu;
