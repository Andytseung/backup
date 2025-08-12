export type NestedArray = (number | null)[][];

export const findIndexWithDifference = (
  nestedArray: NestedArray,
  threshold: number = 3,   // default threshold 2 to preserve original behavior
): number[] => {
  const result: number[] = [];

  if (!nestedArray.length) return result;

  // Number of indices assuming all inner arrays have same length
  const numIndices = nestedArray[0].length;

  for (let i = 0; i < numIndices; i++) {
    const values: number[] = [];

    for (const subArray of nestedArray) {
      const value = subArray[i];
      if (value !== null) {
        values.push(value);
      }
    }

    if (values.length > 0) {
      const maxVal = Math.max(...values);
      const minVal = Math.min(...values);
      if (maxVal - minVal > threshold) {
        result.push(i);
      }
    }
  }
  return result;
};

// Example usage:
const nestedArray: NestedArray = [
  [1, 2, 3, 4, 5],
  [2, 4, 6, 7, 9],
  [null, 3, 1, 2, 3],
];

// Default threshold = 2
const indicesDefault = findIndexWithDifference(nestedArray);
console.log("Indices with difference > 2:", indicesDefault); // e.g. [1,2,3,4]

// Custom threshold = 3
const indicesThreshold3 = findIndexWithDifference(nestedArray, 3);
console.log("Indices with difference > 3:", indicesThreshold3); // e.g. [2,3,4]
