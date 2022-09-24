import React, { useCallback } from "react";
import { useRef, useState } from "react";

export default function Test() {
  const [number, setNumber] = useState(0);

  const numArray = [1, 2, 3, 4, 5];
  const handleSetNumber = useCallback((num) => {
    setNumber(num);
  }, []);
  return (
    <>
      <p>hello</p>
      <div>
        {numArray.map((num) => {
          return <Foo key={num} num={num} handleSetNumber={handleSetNumber} />;
        })}
      </div>

      <NumberDisplay number={number} />
    </>
  );
}

const SelectCount = ({ num, handleSetNumber }) => {
  const handleClick = useCallback((num) => {
    handleSetNumber(num);
  }, []);
  return (
    <div style={{ background: "gray" }}>
      <p>{num}</p>
      <button onClick={() => handleClick(num)}>set to {num}</button>;
    </div>
  );
};

const Foo = React.memo(SelectCount);

function NumberDisplay({ number }) {
  return <p>{number}</p>;
}
