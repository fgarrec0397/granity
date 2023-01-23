import { isArray, mergeWith } from "@granity/helpers";

export default <Object1, Object2>(style1: Object1, style2: Object2) => {
    const mergedStyles = mergeWith({}, style1, style2, (objValue, srcValue) => {
        if (isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });

    return mergedStyles;
};
