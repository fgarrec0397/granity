import getCommon from "./getCommon";
import pxToRem from "./pxToRem";

export default (props) => {
    const widthPx = getCommon("scrollbar.widthPx");
    console.log(widthPx(props), "widthPx");

    return pxToRem(widthPx(props));
};
