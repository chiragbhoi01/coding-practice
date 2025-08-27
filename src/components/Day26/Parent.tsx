import { useCallback, useMemo, useState } from "react";

function Parent() {
  const [length, setLength] = useState<number>(0);
  const [specialChar, setSpeacialChar] = useState<boolean>(false);
  const [numberAllowed, setNumAllowed] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const passwordGenerator = useMemo(() => {
    let pass = "";
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) return (char += "1234567890");
    if (specialChar) return (char += "!@#$%^&*()_+|}{");

    for (let i = 1; i < length; i++) {
      let newChar = Math.floor(Math.random() * char.length + 1);
      pass += char.charAt(newChar);
    }
    setPassword(pass);
  }, [numberAllowed, specialChar, length]);

  return (
    <div>
      <h1>Random Password Generator</h1>
      <div className="border-1 border-orange-300 h-50 w-150 rounded-2xl">
        <input type="text" readOnly className="bg-pink-200" value={"5416531"} />{" "}
        <button>Copy</button>
        <div>
          <input
            type="range"
            value={length}
            max={20}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          lenth : {length}
        </div>
      </div>
    </div>
  );
}

export default Parent;
