import getThemeProperty from "./getThemeProperty";

export default (path: string) => {
    return getThemeProperty(path, "colors");
};
