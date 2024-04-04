/* eslint-disable react/prop-types */
const OutputSection = ({ result }) => {
  return (
    <div className="my-4 space-y-5 border-t border-gray-500 py-4 text-black">
      <h2 className="text-3xl underline underline-offset-2">Code Output:</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>{result}</pre>
    </div>
  );
};

export default OutputSection;
