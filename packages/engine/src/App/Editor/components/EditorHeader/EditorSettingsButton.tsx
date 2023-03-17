import useCore from "@engine/App/Core/_actions/hooks/useCore";
import { AccountMenu, SettingsIcon } from "@granity/ui";
import { FC } from "react";

const EditorSettingsButton: FC = () => {
    const { mainMenu } = useCore();

    if (!mainMenu.length) {
        return null;
    }

    return (
        <AccountMenu
            title="Editor settings"
            id="editor-menu"
            icon={<SettingsIcon />}
            menuItems={mainMenu}
        />
    );
};

export default EditorSettingsButton;
