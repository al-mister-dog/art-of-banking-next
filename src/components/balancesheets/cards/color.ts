let color = "black";

export function useColor(cur: number, prev: number) {
    console.log(cur, prev)
  if (cur === prev && color === "green") {
    color = "green"
    console.log("green")
  }
  if (cur === prev && color === "red") {
    color = "red"
    console.log("red")
  }
  if (cur < prev) {
    color = "red";
  }
  if (cur > prev) {
    color = "green";
  }
  return color;
}
