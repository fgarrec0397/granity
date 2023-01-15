import { rootFontSize } from "../themesConstants";

export default (...args: number[]): string => {
    if (args?.length === 0) {
        return `${args[0] / rootFontSize}rem`;
    }

    let remString = "";

    const pxToRemValue = (value: number) => {
        return value / rootFontSize;
    };

    args.forEach((x, index) => {
        if (args.length - 1 === index) {
            return (remString += `${pxToRemValue(x)}rem`);
        }

        remString += `${pxToRemValue(x)}rem `;
    });

    return remString;
};
