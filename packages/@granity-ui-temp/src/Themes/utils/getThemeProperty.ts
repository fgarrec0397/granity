import { at } from "@granity/helpers";
import { DefaultTheme, ThemeProps } from "styled-components";

export default (
    path: string,
    themeKey: keyof DefaultTheme,
    themeProps: ThemeProps<DefaultTheme>
) => {
    const object = themeProps.theme[themeKey];

    return at(object, path)[0];
};

// TODO - fix lint issues + make sure dev command works
