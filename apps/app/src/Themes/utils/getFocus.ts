import { DefaultTheme, ThemeProps } from "styled-components";

import getThemeProperty from "./getThemeProperty";

export default (path: string) => {
    return (props: ThemeProps<DefaultTheme>) => getThemeProperty(path, "focus", props);
};
