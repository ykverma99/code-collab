/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Editor from "@monaco-editor/react";
import SideBar from "../components/sidebar/SideBar";
import OutputSection from "../components/output/OutputSection";
import ChatSection from "../components/chatSection/ChatSection";
import { useParams } from "react-router-dom";
import axios from "axios";

const File = () => {
  const [code, setcode] = useState("");
  const [output, setoutput] = useState("");
  const [showCode, setshowCode] = useState(false);
  const [toggleSide, settoggleSide] = useState(false);
  const editorRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PORT}/file/api/file/${id}`,
        );
        const { body } = res.data;
        setcode(body.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSidebar = () => {
    settoggleSide((prev) => !prev);
    setshowCode(false);
  };

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const handleChat = () => {
    settoggleSide(true);
    setshowCode(false);
  };

  function codeRunner() {
    settoggleSide(true);
    setshowCode(true);
    if (editorRef.current) {
      const editor = editorRef.current;
      const code = editor.getValue();
      try {
        const originalConsoleLog = console.log;
        const consoleOutputs = [];
        console.log = (...args) => {
          consoleOutputs.push(args.join(" ") + "\n");
          originalConsoleLog.apply(console, args);
        };
        const result = new Function(`return (function() { ${code} })()`)();

        // Restore original console.log and update output state
        setoutput(consoleOutputs.join(""));
      } catch (error) {
        setoutput(error.message, "hello");
      }
    }
  }
  const handleCodeChange = async (newCode) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_PORT}/file/api/file/${id}`,
        { content: newCode },
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-700 text-white">
      <Navbar links={true} />
      <div className="flex items-center justify-center gap-3">
        <Editor
          height={"91vh"}
          value={code}
          width={toggleSide ? "80vw" : "97vw"}
          defaultLanguage="javascript"
          defaultValue="// write you'r code here"
          theme="vs-dark"
          onMount={handleEditorDidMount}
          onChange={handleCodeChange}
        />
        <SideBar
          toggleSide={toggleSide}
          handleToggle={handleSidebar}
          handleCodeRun={codeRunner}
          handleChat={handleChat}
        >
          {toggleSide && showCode && <OutputSection result={output} />}
          {toggleSide && !showCode && <ChatSection />}
        </SideBar>
      </div>
    </div>
  );
};

export default File;
