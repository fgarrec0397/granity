export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecursiveArrayOfIds<TValue> = Array<RecursiveArrayOfIdsItem<TValue>>;

export type RecursiveArrayOfIdsItem<TValue> = {
    id: TValue;
    path?: string;
    children?: RecursiveArrayOfIds<TValue>;
};
