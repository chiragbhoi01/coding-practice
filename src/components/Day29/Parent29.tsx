import React, { useCallback, useEffect, useState } from "react";
import CurrencyProject from "./CurrencyProject";

function Parent29() {
  const [length, setLength] = useState<string>("8");
  const [numberAllowed, setNumberAllowed] = useState<boolean>(false);
  const [speacialCharAllowed, setSpeacialCharAllowed] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const randomPasswordGenerator = useCallback(() => {
    let chars = "asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM";

    if (numberAllowed) {
      chars += "1234567890";
    }

    if (speacialCharAllowed) {
      chars += "!@#$%^&*(){}";
    }

    let randomPass = "";
    const len = parseInt(length) || 8;

    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomPass += chars[randomIndex];
    }

    setPassword(randomPass);
  }, [numberAllowed, speacialCharAllowed, length]);

  useEffect(() => {
    randomPasswordGenerator();
  }, [randomPasswordGenerator]);

  return (
    <>
    {/* <div className="min-h-screen bg-amber-300 flex flex-col items-center justify-center p-6">
      <div>
        <h1 className="text-center bg-red-400 text-white text-4xl font-bold rounded-2xl px-6 py-4 shadow-md">
          Random Password Generator
        </h1>
      </div>
      <div className="bg-blue-50 rounded-2xl p-6 mt-6 w-full max-w-md shadow-lg space-y-4">
        <input
          className="w-full text-2xl border-2 border-gray-300 rounded-2xl p-3 text-center"
          type="text"
          value={password}
          readOnly
          placeholder="Your generated password"
        />
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min={1}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="flex-grow accent-red-400"
          />
          <span className="text-lg font-semibold">Length: {length}</span>
        </div>
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
            className="w-5 h-5 accent-red-400"
          />
          <span>Number Allowed</span>
        </label>
        <br />
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={speacialCharAllowed}
            onChange={() => setSpeacialCharAllowed(!speacialCharAllowed)}
            className="w-5 h-5 accent-red-400"
          />
          <span>Special Allowed</span>
        </label>
      </div>
    </div> */}
    {/* Curreny Project*/}
    <CurrencyProject/>
    </>
  );
}

export default Parent29;
