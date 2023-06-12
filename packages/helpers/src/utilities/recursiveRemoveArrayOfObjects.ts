import { RecursiveArrayOfIds } from "@granity/helpers";

const recursiveRemoveArrayOfObjects = <ArrayType extends RecursiveArrayOfIds<string>>(
    array: ArrayType,
    id: string
) => {
    return array
        .map((item) => {
            return { ...item };
        })
        .filter((item) => {
            if ("children" in item && item.children) {
                item.children = recursiveRemoveArrayOfObjects(item.children, id);
            }
            return item.id !== id;
        });
};

export default recursiveRemoveArrayOfObjects;
