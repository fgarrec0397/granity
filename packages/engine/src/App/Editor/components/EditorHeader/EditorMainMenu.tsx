import useConfig from "@engine/App/Core/_actions/hooks/useConfig";
import { AppMenu, MenuIcon } from "@granity/ui";
import { FC } from "react";

import { useEditor } from "../../_actions/hooks";

const EditorMainMenu: FC = () => {
    const { editorMainMenu } = useConfig();
    const { isEditor } = useEditor();

    return (
        <AppMenu
            title="Main Menu"
            id="editor-menu"
            icon={<MenuIcon />}
            disabled={!isEditor}
            menuItems={editorMainMenu}
        />
    );
};

export default EditorMainMenu;
