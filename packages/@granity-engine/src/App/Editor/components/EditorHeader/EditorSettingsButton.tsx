import { AccountMenu, DashboardIcon, SettingsIcon } from "@granity/ui";
import { FC } from "react";

const EditorSettingsButton: FC = () => {
    return (
        <AccountMenu
            title="Editor settings"
            id="editor-menu"
            icon={<SettingsIcon />}
            menuItems={[
                {
                    text: "Go to dashboard",
                    onClick: () => signOut(),
                    icon: <DashboardIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default EditorSettingsButton;
