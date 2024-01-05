/**
 * Maps an array to instances of a given class.
 *
 * @param {Array} arr - The array to map.
 * @param {Class} ClassType - The class to instantiate.
 * @returns {Array} - The mapped array of instances.
 */
export function mapToClass(arr, ClassType) {
    // Map each item in the array to a new instance of the given class
    return arr.map(item => new ClassType(item));
}
