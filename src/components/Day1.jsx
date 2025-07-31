import React, { useState } from "react";

export default function Usestate() {
  const [counter, setCounter] = useState(0);
    const [inputVal ,setInputVal] = useState(null)
    const [arr , setArr] = useState(["marshal"])
    const [obj , setObj ]= useState({name : "marshal",age : 21})
    // console.log(arr)
  const increaseCount = () => {
    if (counter < 20) {
      setCounter(() => counter + 1);
    }
  };
  const decreaseCount = () => {
    if (counter > -20) {
      setCounter(counter - 1);
    }
  };
  const arrAdd = () => {
    setArr([...arr, "1+2"])
  }
  return (
    <>
      <div>
        <h1>
          counter value : {counter} <br />
        </h1>
        <div>
          {counter === 20 && <h3>You hit of counter value {counter} </h3>}
        </div>
        <button onClick={increaseCount}>Increase Counter +1</button>{" "}
        <button onClick={decreaseCount}>Decrease Counter -1</button>
        <button onClick={() => setCounter(counter + 5)}>
          Increase Counter +5
        </button>
        <button onClick={() => setCounter(counter - 5)}>
          Decrease Counter -5
        </button>
      </div>
      <div>
        <h1>Input Value Store in State</h1>
        <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)}/> <br/>
        input value : {inputVal}
      </div>
      <div>
        <h1>Add new array object in state</h1>
        {obj.name} <br/>
        {obj.age} <br/>
        {obj.address}
        <button onClick={() => setObj({...obj, name : "chiarg" , age : '20'})}>Change Data</button>
        <button onClick={() => setObj({...obj, address : "udaipur"})}>Add Data</button>
        
        <div>
            <h2>Array</h2>
            {arr.map((el) => <h1 key={el}>{el}</h1>)}
            <button onClick={arrAdd}>Add array</button>
        </div>
      </div>
    </>
  );
}

// import React, { useState } from "react";

// export default function Usestate() {
//   const [counter, setCounter] = useState(0);
//   const [inputVal, setInputVal] = useState("");
//   const [arr, setArr] = useState(["marshal"]);
//   const [obj, setObj] = useState({ name: "marshal", age: 21 });

//   // 🔼 Increment counter with a safe function update
//   const increaseCount = () => {
//     if (counter < 20) {
//       setCounter(prev => prev + 1);
//     }
//   };

//   // 🔽 Decrement counter
//   const decreaseCount = () => {
//     if (counter > -20) {
//       setCounter(prev => prev - 1);
//     }
//   };

//   // ➕ Add to array
//   const arrAdd = () => {
//     setArr([...arr, "1+2"]);
//   };

//   return (
//     <>
//       {/* Counter Section */}
//       <div>
//         <h1>Counter value: {counter}</h1>
//         {counter === 20 && <h3>You hit the counter limit {counter}</h3>}
        
//         <button onClick={increaseCount}>Increase Counter +1</button>{" "}
//         <button onClick={decreaseCount}>Decrease Counter -1</button>{" "}
//         <button onClick={() => setCounter(prev => prev + 5)}>
//           Increase Counter +5
//         </button>{" "}
//         <button onClick={() => setCounter(prev => prev - 5)}>
//           Decrease Counter -5
//         </button>
//       </div>

//       {/* Input Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h1>Input Value Store in State</h1>
//         <input
//           type="text"
//           value={inputVal}
//           onChange={(e) => setInputVal(e.target.value)}
//           placeholder="Type something..."
//         />
//         <br />
//         Input value: {inputVal}
//       </div>

//       {/* Object Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h1>Update Object in State</h1>
//         Name: {obj.name} <br />
//         Age: {obj.age} <br />
//         {obj.address && <>Address: {obj.address}</>} <br />
        
//         <button onClick={() => setObj({ ...obj, name: "chirag", age: 20 })}>
//           Change Name & Age
//         </button>{" "}
//         <button onClick={() => setObj({ ...obj, address: "Udaipur" })}>
//           Add Address
//         </button>
//       </div>

//       {/* Array Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h1>Array in State</h1>
//         {arr.map((el, index) => (
//           <h3 key={index}>{el}</h3>
//         ))}
//         <button onClick={arrAdd}>Add Array Item</button>
//       </div>
//     </>
//   );
// }
