function calculateArraySum(nums: number[]): number {
  const length = nums.length;

  if (length <= 2) {
    const tempLength = nums.join('').length;
    if (tempLength <= 2) return +nums.join('');

    return calculateArraySum(
      nums
        .join('')
        .split('')
        .map((val) => +val)
    );
  }

  for (let i = 0; i < length >> 1; i++) {
    nums[i] = nums[i] + nums[length - i - 1];
  }

  const restArray = nums.slice(undefined, (length >> 1) + (length % 2 ? 1 : 0));
  return calculateArraySum(restArray);
}

export function loveCalculationAlgorithm(personA: string, personB: string): number {
  const str = personA + ' loves ' + personB;
  const uniqueCharCount = new Map<string, number>();

  for (const character of str) {
    if (character === ' ') continue;
    let count = 1;

    if (uniqueCharCount.has(character)) count = uniqueCharCount.get(character)! + 1;

    uniqueCharCount.set(character, count);
  }

  const values = [...uniqueCharCount.values()];

  return calculateArraySum(values);
}
