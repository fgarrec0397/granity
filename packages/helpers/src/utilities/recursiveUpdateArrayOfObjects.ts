import { RecursiveArrayOfIds } from "@granity/helpers";

const recursiveRemoveArrayOfObjects = <ArrayType extends RecursiveArrayOfIds<string>>(
    array: ArrayType,
    id: string,
    path?: string
) => {
    return array
        .map((item, index) => {
            return { ...item, path: path ? path?.concat("/", index.toString()) : index.toString() };
        })
        .filter((item) => {
            if ("children" in item && item.children) {
                item.children = recursiveRemoveArrayOfObjects(item.children, id, item.path);
            }
            return item.id !== id;
        });
};

export default recursiveRemoveArrayOfObjects;
