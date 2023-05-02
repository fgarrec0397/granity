import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { AppMenu, AppMenuProps, SettingsIcon } from "@granity/ui";
import { FC, useMemo } from "react";

import { useEditor } from "../../_actions/hooks";
import EditorPublishedStatus from "../EditorCommon/EditorPublishedStatus";

const EditorSettingsMenu: FC = () => {
    const { saveApp, publishApp } = useCore();
    const { isEditor } = useEditor();

    const menuItems = useMemo<AppMenuProps["menuItems"]>(
        () => [
            {
                text: "Publish",
                onClick: publishApp,
            },
            {
                text: "Save",
                onClick: saveApp,
            },
        ],
        [saveApp, publishApp]
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
