import at from "lodash/at";
import { DefaultTheme, ThemeProps } from "styled-components";

export default (
    path: string,
    themeKey: keyof DefaultTheme,
    themeProps: ThemeProps<DefaultTheme>
) => {
    const object = themeProps.theme[themeKey];

    return at(object, path)[0];
};
