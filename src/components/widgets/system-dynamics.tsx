import { useEffect, useState } from "react";

export default function SystemDynamics() {
  const [count1, setCount1] = useState(1);
  const [count2, setCount2] = useState(1);
  const [result, setResult] = useState(0);
  useEffect(() => {
    count1 > 0 &&
      setTimeout(() => {
        setResult(result + 1);
        setCount1(count1 + 1);
      }, 1000);
  }, [count1]);

  useEffect(() => {
    count2 > 0 &&
      setTimeout(() => {
        setResult(result - 1);
        setCount2(count1 + 1);
      }, 1000);
  }, [count2]);
  return <>{result}</>;
}
