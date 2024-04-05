import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputCntroller/Input";
import Navbar from "../components/navbar/Navbar";
import { MdDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";

const Codes = () => {
  const [fileName, setfileName] = useState("");
  const [data, setdata] = useState(null);
  const [toggleModal, settoggleModal] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PORT}/file/api/userfile/${user._id}`,
        );
        const { body } = res.data;
        if (res.status == 200) {
          setdata(body);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user._id]);

  const handleInput = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.stopPropagation();
    const data = {
      filename: fileName,
      ownerId: user._id,
      fileType: "js",
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PORT}/file/api/create`,
        data,
      );
      const { body } = res.data;
      console.log(body);
      if (res.status == 201) {
        navigate(`/file/${body._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <div className="relative">
      <div>
        <Navbar />
        <div className="mt-24 flex flex-col items-center gap-8">
          <h2 className="font-mono text-6xl">Your Codeshares</h2>

          <div className="w-[60vw] space-y-5">
            <div className="flex justify-end">
              <Button onClick={() => settoggleModal(true)}>
                New Codeshare
              </Button>
            </div>
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-500">
                  <th className="w-80 p-2 uppercase">File Name</th>
                  <th className="w-60 p-2 uppercase">File Type</th>
                  <th className="w-80 p-2 uppercase">Created at</th>
                  <th className="w-32 p-2 uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((elm) => {
                    return (
                      <tr
                        className="border-b border-gray-300 capitalize"
                        key={elm._id}
                      >
                        <td className="max-w-48 p-2 text-lg font-semibold text-blue-500">
                          <Link to={`/file/${elm._id}`}>{elm.filename}</Link>
                        </td>
                        <td className="max-w-48 p-2 text-lg font-semibold text-blue-500">
                          {elm.fileType}
                        </td>
                        <td className="max-w-48 p-2">
                          {new Date(elm.createdAt).toLocaleString()}
                        </td>
                        <td className="max-w-48 p-2">
                          <MdDeleteForever
                            size={22}
                            color="gray"
                            className="cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* modal section for making new code file */}
      {toggleModal && (
        <div
          onClick={() => settoggleModal(false)}
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
                onChange={(e) => setfileName(e.target.value)}
              />
              <div className="w-[20vw]">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Codes;
