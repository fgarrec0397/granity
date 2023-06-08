export type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RecursiveIdsArray<Type extends string | number> = Array<
    Type | [Type, RecursiveIdsArray<Type>]
>;
