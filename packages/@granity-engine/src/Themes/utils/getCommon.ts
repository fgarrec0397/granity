import { DefaultTheme, ThemeProps } from "styled-components";

import getThemeProperty from "./getThemeProperty";

export default (path: string) => {
    return (props: ThemeProps<DefaultTheme>) => {
        return getThemeProperty(path, "common", props);
    };
};
