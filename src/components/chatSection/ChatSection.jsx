/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { IoIosSend } from "react-icons/io";
import socketClient from "../../context/SocketInstace";
import useUser from "../../hooks/useUser";

const ChatSection = ({ id }) => {
  const [inputValue, setinputValue] = useState("");
  const [messages, setmessages] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    socketClient.on("receiveMessage", (message) => {
      console.log(message);
      setmessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketClient.off("receiveMessage");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketClient]);

  const handleInput = (e) => {
    setinputValue(e.target.value);
  };
  const handleSendMessage = () => {
    const messageData = {
      fileId: id,
      userId: user._id,
      message: inputValue,
    };
    if (inputValue.trim() !== "") {
      socketClient.emit("sendMessage", messageData);
      setinputValue("");
      setmessages((prevMessages) => [...prevMessages, messageData]);
    }
  };
  const handleKeyInput = (e) => {
    if (e.keyCode == 13) {
      handleSendMessage();
    }
  };

  return (
    <div className="relative my-4 h-[85vh] space-y-5 border-t border-gray-500 pt-4">
      <div className="h-[90%] space-y-2 overflow-auto px-2">
        {messages.map((elm, idx) => {
          return (
            <p
              key={idx}
              className={`${elm.userId == user._id ? "float-right" : "float-left"} clear-both max-w-72 bg-slate-600 px-3 py-2 `}
            >
              {elm.message}
            </p>
          );
        })}
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
            onClick={handleSendMessage}
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
