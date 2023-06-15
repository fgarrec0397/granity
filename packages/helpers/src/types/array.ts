export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecursiveObjectWithChildren<Type> = Type & {
    path: string;
    children?: RecursiveArrayOfObjects<Type>;
};

export type RecursiveArrayOfObjects<Type> = Array<RecursiveObjectWithChildren<Type>>;

export type RecursiveArrayOfIds<TValue> = RecursiveArrayOfObjects<{
    id: TValue;
    path: string;
    children?: RecursiveArrayOfIds<TValue>;
}>;

export type RecursiveArray<Type extends string | number> = Array<RecursiveArrayItem<Type>>;

export type RecursiveArrayItem<Type extends string | number> = Type | [Type, RecursiveArray<Type>];
