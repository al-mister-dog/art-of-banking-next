import { useState, useEffect } from "react";

export default function DayTimer() {
  const [counter, setCounter] = useState(30);

  // useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  return (
    <div>
      <div>Day One: {counter}</div>
    </div>
  );
}
