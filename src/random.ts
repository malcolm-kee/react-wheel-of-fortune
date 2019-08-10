export function range(min: number, max: number) {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('Expected all arguments to be numbers');
  }

  return Math.random() * (max - min) + min;
}

export function pick<T>(list: T[]): T | undefined {
  if (list.length === 0) {
    return undefined;
  }
  return list[Math.floor(range(0, list.length))];
}
