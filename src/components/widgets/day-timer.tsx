import { useState, useEffect } from "react";

export default function DayTimer() {
  const [counter, setCounter] = useState(30);
  const [count, setCount] = useState(1);
  const [meridian, setMeridian] = useState("am");
  // useEffect(() => {
  //   let meridian = "am";
  //   setTimeout(() => {
  //     setCount(count + 1);
  //     if (count > 11) {
  //       setCount(1);
  //       if (meridian === "am") {
  //         setMeridian("pm");
  //       } else {
  //         setMeridian("am");
  //       }
  //     }
  //     return `${count}${meridian}`;
  //   }, 500);
  // }, [count]);

  // useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  return (
    <div>
      <h1>
        {count}
        {meridian}
      </h1>
    </div>
  );
}
