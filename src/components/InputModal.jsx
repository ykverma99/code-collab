/* eslint-disable react/prop-types */
import Button from "./buttons/Button";
import { RxCross2 } from "react-icons/rx";
import Input from "./inputCntroller/Input";

const InputModal = ({ onClick, onSubmit, onChange, handleInput, fileName }) => {
  return (
    <div
      onClick={onClick}
      className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-30"
    >
      <div className="w-[25vw] bg-white p-5">
        <div className="flex justify-end">
          <RxCross2 size={25} className="cursor-pointer" />
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <Input
            label={"Enter File Name"}
            id={"file"}
            value={fileName}
            onClick={handleInput}
            onChange={onChange}
          />
          <div className="w-[20vw]">
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
