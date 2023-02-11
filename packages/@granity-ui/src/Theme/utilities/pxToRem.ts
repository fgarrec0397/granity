import { htmlFontSize } from "../theme";

export default (...args: number[]): string => {
    if (args?.length === 0) {
        return `${args[0] / htmlFontSize}rem`;
    }

    let remString = "";

    const pxToRemValue = (value: number) => {
        return value / htmlFontSize;
    };

    args.forEach((x, index) => {
        if (args.length - 1 === index) {
            return (remString += `${pxToRemValue(x)}rem`);
        }

        remString += `${pxToRemValue(x)}rem `;
    });

    return remString;
};
