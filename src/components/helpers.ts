export function splitArray(array: any[]) {
    const half = array.length / 2;
    const halfAndRemainder = Math.round(half);
    return array.length % 2 === 0
      ? [array.slice(0, half), array.slice(half, array.length)]
      : [
          array.slice(0, halfAndRemainder),
          array.slice(halfAndRemainder, array.length),
        ];
  }
  