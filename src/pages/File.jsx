/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Editor from "@monaco-editor/react";
import SideBar from "../components/sidebar/SideBar";

const File = () => {
  // const [output, setoutput] = useState("");
  const [toggleSide, settoggleSide] = useState(false);
  const editorRef = useRef(null);

  const handleSidebar = () => {
    settoggleSide((prev) => !prev);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // function showValue() {
  //   if (editorRef.current) {
  //     const editor = editorRef.current;
  //     const code = editor.getValue();
  //     try {
  //       const originalConsoleLog = console.log;
  //       const consoleOutputs = [];
  //       console.log = (...args) => {
  //         consoleOutputs.push(args.join(" "));
  //         originalConsoleLog.apply(console, args);
  //       };
  //       const result = new Function(`return (function() { ${code} })()`)();

  //       // Restore original console.log and update output state
  //       setoutput(consoleOutputs.join("\n"));
  //     } catch (error) {
  //       setoutput(error.message, "hello");
  //     }
  //   }
  // }
  return (
    <div className="bg-slate-700 text-white">
      <Navbar links={true} />
      <div className="flex items-center justify-center gap-3">
        <Editor
          height={"91vh"}
          width={toggleSide ? "80vw" : "97vw"}
          defaultLanguage="python"
          defaultValue="// write you'r code here"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          // onChange={handleChange}
        />
        <SideBar toggleSide={toggleSide} onClick={handleSidebar} />
      </div>
    </div>
  );
};

export default File;
