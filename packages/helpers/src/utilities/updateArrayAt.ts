import { clone } from "../lib";
import { ArrayElement } from "../types";

export default <ArrayType extends unknown[]>(
    array: ArrayType,
    value: ArrayElement<ArrayType>,
    index: number
) => {
    const newArray: ArrayType = clone(array);

    newArray[index] = value;

    return newArray;
};
