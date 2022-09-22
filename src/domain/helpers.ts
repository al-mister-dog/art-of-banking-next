type Obj = { [x: string]: any }

export function mapObject(object: Obj) {
  return Object.keys(object).map((key) => object[key])
}

export function filterObject(object: Obj, filterFunction: (v: any) => boolean) {
  return mapObject(object).filter((o) => filterFunction(o))
}

//usage
// filterObject(object, (o) => o.id > 2)
// mapObject(object)