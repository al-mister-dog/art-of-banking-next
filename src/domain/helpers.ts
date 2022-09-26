type Obj = { [x: string]: any };

export function mapObject(object: Obj) {
  return Object.keys(object).map((key) => object[key]);
}

export function filterObject(object: Obj, filterFunction: (v: any) => boolean) {
  return mapObject(object).filter((o) => filterFunction(o));
}

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
