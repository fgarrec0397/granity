// <-------------------- OBJECTS -------------------->

/**
 * Empty object type.
 * Equivalent of `{}`
 */
export type EmptyObject = Record<string, never>;

// <-------------------- DICTIONARY -------------------->

/**
 * Create a key pair object type
 */
export type Dictionary<Type> = {
    [key: string]: Type;
};

/**
 * Get the type of a dictionary item of the given Dictionary
 */
export type DictionaryValue<DictionaryType> = DictionaryType[keyof DictionaryType];
