import { useRef } from "react";
import Navbar from "../components/navbar/Navbar";
import Editor from "@monaco-editor/react";

const File = () => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monaco.editor.defineTheme("myCustomTheme", {
      base: "vs", // can also be 'hc-black'
      inherit: true,
      rules: [{ background: "EDF9FA" }],
    });
    monaco.editor.setTheme("myCustomTheme");
  }
  function executeCode() {
    const editor = editorRef.current;
    const model = editor.getModel();
    const code = model.getValue();

    // Run the code using Monaco Editor's built-in functionality
    try {
      const result = new Function(code)();
      console.log("Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 from-30% to-blue-500 text-white">
      <Navbar links={true} />
      <div>
        <button onClick={executeCode}>Run Code</button>
        <Editor
          height={"90vh"}
          defaultLanguage="javascript"
          defaultValue="// write you'r code here"
          theme="myCustomTheme"
          editorDidMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default File;
