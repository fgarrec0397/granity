import { DefaultTheme, ThemeProps } from "styled-components";

import getThemeProperty from "./getThemeProperty";

export default (path: string) => {
    return (props: ThemeProps<DefaultTheme>) => {
        // console.log(getThemeProperty(path, "common", props), path, "");

        return getThemeProperty(path, "common", props);
    };
};
