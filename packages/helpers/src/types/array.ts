export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecursiveIdsArray<Type extends string | number> = Array<RecursiveIdsArrayItem<Type>>;

export type RecursiveIdsArrayItem<Type extends string | number> =
    | Type
    | [Type, RecursiveIdsArray<Type>];
