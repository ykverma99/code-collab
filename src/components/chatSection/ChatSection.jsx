import { useState } from "react";
import Button from "../buttons/Button";
import { IoIosSend } from "react-icons/io";

const ChatSection = () => {
  const [inputValue, setinputValue] = useState("");

  const handleInput = (e) => {
    setinputValue(e.target.value);
  };
  const handleClickInput = () => {
    console.log(inputValue, "click");
    setinputValue("");
  };
  const handleKeyInput = (e) => {
    if (e.keyCode == 13) {
      console.log(inputValue, "kkk");
      setinputValue("");
    }
  };

  return (
    <div className="relative my-4 h-[85vh] space-y-5 border-t border-gray-500 pt-4">
      <div className="h-[90%] space-y-2 overflow-auto px-2">
        <p className="float-left clear-both max-w-72 bg-slate-600 px-3 py-2 ">
          left
        </p>
        <p className="float-right clear-both max-w-72 bg-slate-600 px-3 py-2">
          right
        </p>
      </div>
      <div className="sticky bottom-0">
        <div className="group relative m-2 flex h-14 items-center bg-white ">
          <input
            type="text"
            placeholder="Message..."
            className="h-full w-[75%] px-3 text-black "
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyInput}
          />
          <Button
            onClick={handleClickInput}
            size={"sm"}
            className={"absolute right-4"}
          >
            <IoIosSend size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
