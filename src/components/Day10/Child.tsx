import React, { useState } from "react";

const Parent = () => {
  const [counter, setCounter] = useState<number>(0);

  return (
    <>
      <Child value={counter} />
      <button
      onClick={() => setCounter(counter+1)}
      >Increase Value</button>
    </>
  );
};

export default Parent;

const Child = React.memo(({ value }: { value: number }) => {
    console.log("child rendreing")
  return <h1>Value: {value}</h1>;
});
