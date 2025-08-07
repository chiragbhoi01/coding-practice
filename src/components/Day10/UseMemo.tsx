import React, { useMemo, useState } from "react";

const users = new Array(100).fill("User").map((val, i) => `${val} ${i}`);
users.push("chirag" , "mohit" ,"jatin")

export default function WithUseMemo() {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    console.log("Filtering Users...");
    return users.filter((user) => user.includes(search));
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredUsers.slice(0, 15).map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
}













// import React, {  useCallback, useMemo, useState } from "react";

// export default function UseMemo () {
//     const [ counter , setCounter ] = useState<number>(0)
    

//     const expensiveCalucu = useMemo(()=> {
//         console.log("expensive Calculation....")
//         return counter ** 5
//     },[counter])

//     const handleClick = useCallback(() =>{
//         setCounter((prev) => prev +1)
//     },[])
//     return (
//         <>
//         <h1>{counter}</h1>
//         <button
//         onClick={handleClick}
//         >use memo</button>
//         </>
        

//     )
// }