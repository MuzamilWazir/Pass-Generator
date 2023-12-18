import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowes] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();

  const Passwordref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "~!@#$%^&*()_+[]{}-";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordCopyToClipBoard = useCallback(() => {
    Passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);
  return (
    <>
      <div className=" w-full h-40 max-w-md  mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700">
        <h1 className="text-center text-4xl text-white font-bold my-6 py-2 ">
          Password Generator
        </h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={Passwordref}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={passwordCopyToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2 ">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="curser-pointer"
              onChange={(e) => {
                setLenght(e.target.value);
              }}
            ></input>
            <label>length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowes((prev) => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="CharInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
