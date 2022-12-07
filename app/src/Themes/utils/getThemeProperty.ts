import at from "lodash/at";
import { DefaultTheme } from "styled-components";

import getTheme from "./getTheme";

export default (path: string, themeObject: keyof DefaultTheme) => {
    const object = getTheme()[themeObject];

    return at(object, path);
};
