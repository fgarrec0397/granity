import { ReactNode } from "react";
// eslint-disable-next-line import/named
import { GLTF } from "three-stdlib";

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

/**
 * Create a key pair object type
 */
export type Dictionary<Type> = {
    [key: string]: Type;
};

/**
 * Type representing falsy values in TypeScript: `false | "" | 0 | null | undefined`
 */
export type Falsy = false | "" | 0 | null | undefined;

// <-------------------- THREEJS -------------------->

/**
 * A common ThreeJS GLTF result where T is an extension of the result
 */
export type GLTFResult<T> = GLTF & T;

/**
 * An array representation of a Vector3 type
 */
export type Vector3Array = [number, number, number];

/**
 * Optional generic type.
 * Equivalent of `{}`
 */
export type OptionalType = Record<string, never>;

// <-------------------- REACT -------------------->

/**
 * A React with children prop
 */
export type HasChildren = {
    children: ReactNode | ReactNode[];
};
