

import React from 'react'
import Product from './Product'
// import UseMemo from './UseMemo'

function Day10() {
  return (
    <div>
      {/* <UseMemo/> */}
      <Product/>
    </div>
  )
}

export default Day10

// import React from "react";
// import { useToggle } from "./useToggle";

// function Day10() {
//   const [isToggle, isValue] = useToggle();

//   return (
//     <div>
//       <h1>day 10</h1>
//       <button className="bg-blue-500 cursor-pointer" onClick={isToggle}>
//         {isValue ? "Hide" : "Show"}
//       </button>
//       <span>{isValue && <h1>Hello Everyone</h1>}</span>
//     </div>
//   );
// }

// export default Day10;
