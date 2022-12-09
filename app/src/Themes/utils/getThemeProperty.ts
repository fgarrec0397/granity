import at from "lodash/at";
import { DefaultTheme, ThemeProps } from "styled-components";

export default (
    path: string,
    themeObject: keyof DefaultTheme,
    themeProps: ThemeProps<DefaultTheme>
) => {
    const object = themeProps.theme[themeObject];

    return at(object, path);
};
