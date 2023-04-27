import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import { AppMenu, AppMenuProps, SettingsIcon } from "@granity/ui";
import { FC, useMemo } from "react";

import { useEditor } from "../../_actions/hooks";

const EditorSettingsMenu: FC = () => {
    const { saveScene } = useScenes();
    const { isEditor } = useEditor();

    const menuItems = useMemo<AppMenuProps["menuItems"]>(
        () => [
            {
                text: "Save",
                onClick: saveScene,
            },
        ],
        [saveScene]
    );

    return (
        <AppMenu
            title="Settings Menu"
            id="editor-settings-menu"
            icon={<SettingsIcon />}
            disabled={!isEditor}
            menuItems={menuItems}
        />
    );
};

export default EditorSettingsMenu;
