import { RecursiveArrayOfIds } from "@granity/helpers";

const recursiveArrayRemoveitem = <ArrayType extends RecursiveArrayOfIds<string>, IDType>(
    array: ArrayType,
    id: IDType,
    path?: string
) => {
    return array
        .map((x, index) => {
            return { ...x, path: path ? path?.concat("/", index.toString()) : index.toString() };
        })
        .filter((x) => {
            if ("children" in x && x.children) {
                x.children = recursiveArrayRemoveitem(x.children, id, x.path);
            }
            return x.id !== id;
        });
};

export default recursiveArrayRemoveitem;
