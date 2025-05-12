export const filterRepeatedNumber = (arr: number[]): number[] => [
  ...new Set(arr),
];
