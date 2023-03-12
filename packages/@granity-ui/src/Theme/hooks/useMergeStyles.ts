import { useMerge } from "@granity/helpers";

export default <TObject1, TObject2>(object1: TObject1, object2: TObject2) => {
    return useMerge(object1, object2);
};
