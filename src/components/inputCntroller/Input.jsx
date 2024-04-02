import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Input = ({ id, label, type, onChange, value }) => {
  const [isFocus, setisFocus] = useState(false);
  return (
    <div
      onClick={() => setisFocus(true)}
      className="group relative inline-block space-y-1"
    >
      <label
        className={`${isFocus ? "left-0 top-0" : "left-4 top-[51%]"} absolute  text-gray-400 transition-all delay-200 duration-500 ease-in-out group-focus-within:left-0 group-focus-within:top-0 group-focus-visible:left-0`}
        htmlFor={id}
      >
        {label}
      </label>
      <br />
      <input
        className="w-96 rounded-lg border  border-gray-300 px-4 py-3 focus:bg-blue-100 focus:bg-opacity-30 focus:outline-blue-500"
        type={type || "text"}
        value={value}
        // placeholder="hello"
        id={id}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
