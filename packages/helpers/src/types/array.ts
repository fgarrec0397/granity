export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecursiveObjectWithChildren<Type> = Type & {
    children?: RecursiveArrayOfObjects<Type>;
};

export type RecursiveArrayOfObjects<Type> = Array<RecursiveObjectWithChildren<Type>>;

export type RecursiveArrayOfIds<TValue> = RecursiveArrayOfObjects<{
    id: TValue;
    children?: RecursiveArrayOfIds<TValue>;
}>;

export type RecursiveArray<Type extends string | number> = Array<RecursiveArrayItem<Type>>;

export type RecursiveArrayItem<Type extends string | number> = Type | [Type, RecursiveArray<Type>];
