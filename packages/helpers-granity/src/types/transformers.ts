/**
 * Take an interface as parameter and return all children types as union types;
 */
export type UnionOfProperties<Type> = {
    [Key in keyof Type]: Key extends any ? Type[Key] : never;
}[keyof Type];

/**
 * Remove all nullable types from properties
 */
export type MapPropertiesToNonNullable<Type> = {
    [Property in keyof Type]: NonNullable<Type[Property]>;
};

/**
 * Remove specific property from a type object or interface
 */
export type SetOptionalPropertyFrom<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>;
