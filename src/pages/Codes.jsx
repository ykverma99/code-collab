import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import Navbar from "../components/navbar/Navbar";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUser from "../hooks/useUser";
import InputModal from "../components/InputModal";
import { RxCross2 } from "react-icons/rx";
import NewFile from "../assets/create_new.svg";
import JoinRoom from "../assets/join_room_image.svg";
import { toast } from "react-toastify";

const Codes = () => {
  const [fileName, setfileName] = useState("");
  const [data, setdata] = useState(null);
  const [fileType, setFileType] = useState("none");
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
  }, [user._id, data]);

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

  const deleteFile = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_PORT}/file/api/file/${id}`,
        data,
      );
      if (res.status == 200) {
        toast.success(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
                            onClick={() => deleteFile(elm._id)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {!data && (
              <div className="flex w-full flex-col items-center justify-center gap-5">
                <h3 className="text-3xl font-medium tracking-wide">
                  No File, Create new File
                </h3>
                <Button onClick={() => settoggleModal(true)}>
                  New Codeshare
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* modal section for making new code file */}
      {toggleModal && (
        <div
          onClick={() => settoggleModal(false)}
          className="fixed left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-opacity-30"
        >
          <div className="h-[45vh] w-[40vw] space-y-10 bg-white p-5">
            <div className="flex justify-end">
              <RxCross2 size={25} className="cursor-pointer" />
            </div>
            <div
              onClick={handleInput}
              className="flex items-center justify-center gap-8"
            >
              <div className=" space-y-3 border p-5 text-center shadow-lg shadow-gray-600">
                <div>
                  <img src={JoinRoom} alt="join_room" />
                </div>
                {/* <p className="text-3xl font-semibold text-blue-950">
                  Join Room
                </p> */}
                <Button
                  onClick={() => {
                    setFileType("join");
                    settoggleModal(false);
                  }}
                  className={"bg-blue-950"}
                >
                  Join Room
                </Button>
              </div>
              <div className=" space-y-3 border p-5 text-center shadow-lg shadow-gray-600">
                <div>
                  <img src={NewFile} alt="new_file" />
                </div>
                {/* <p className="text-3xl font-semibold text-blue-950">
                  Create New File
                </p> */}
                <Button
                  onClick={() => {
                    setFileType("new");
                    settoggleModal(false);
                  }}
                >
                  Create New File
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {fileType == "new" ? (
        <InputModal
          fileName={fileName}
          handleInput={handleInput}
          onClick={() => {
            setFileType("none");
            setfileName("");
          }}
          onChange={(e) => setfileName(e.target.value)}
          onSubmit={handleSubmit}
        />
      ) : fileType == "join" ? (
        <InputModal
          fileName={fileName}
          handleInput={handleInput}
          onClick={() => {
            setFileType("none");
            setfileName("");
          }}
          onChange={(e) => setfileName(e.target.value)}
          onSubmit={() => navigate(fileName)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Codes;
