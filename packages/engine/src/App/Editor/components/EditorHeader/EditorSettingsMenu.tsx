import useScenes from "@engine/App/Scenes/_actions/hooks/useScenes";
import { AppMenu, AppMenuProps, SettingsIcon } from "@granity/ui";
import { FC, useMemo } from "react";

import { useEditor } from "../../_actions/hooks";
import EditorPublishedStatus from "../EditorCommon/EditorPublishedStatus";

const EditorSettingsMenu: FC = () => {
    const { saveScenes } = useScenes();
    const { isEditor } = useEditor();

    const menuItems = useMemo<AppMenuProps["menuItems"]>(
        () => [
            {
                text: "Save",
                onClick: saveScenes,
            },
        ],
        [saveScenes]
    );

    return (
        <AppMenu
            title="Settings Menu"
            id="editor-settings-menu"
            icon={<SettingsIcon />}
            subIcon={<EditorPublishedStatus />}
            disabled={!isEditor}
            menuItems={menuItems}
        />
    );
};

export default EditorSettingsMenu;
