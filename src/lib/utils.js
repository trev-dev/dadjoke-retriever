/**
 * Get a random value from an array.
 *
 * @template T
 * @param {Array<T>} arr
 * @returns {T} a random array index value
 */
export function getRandomArrayValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

