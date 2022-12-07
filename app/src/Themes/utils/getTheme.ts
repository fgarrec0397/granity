import theme from "@themes/theme";
import clone from "lodash/clone";

export default () => {
    return clone(theme);
};
