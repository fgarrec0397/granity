/**
 * Returns a random number between min and max (both included)
 *
 * @param min The minimum number of the random value
 * @param max The maximum number of the random value
 *
 * @return The random number
 */
export default (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
