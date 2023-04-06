/**
 * Take an interface as parameter and return all children types as union types;
 */
export type UnionOfProperties<Type> = {
    [Key in keyof Type]: Key extends any ? Type[Key] : never;
}[keyof Type];

/**
 * Recursively remove all nullable and/or undefined types from object
 */
export type DeepNonNullable<T> = {
    [K in keyof T]-?: DeepNonNullable<T[K]>;
};

/**
 * Remove specific property from a type object or interface
 */
export type SetOptionalPropertyFrom<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;
