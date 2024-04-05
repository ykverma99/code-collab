import Button from "../components/buttons/Button";
import Navbar from "../components/navbar/Navbar";
import myImage from "../assets/ss.png";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleNavigate = () => {
    if (user) {
      navigate("/codes");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 from-30% to-blue-500 text-white">
      <Navbar links={true} />
      <div className="flex h-[90vh] flex-col items-center justify-center gap-20">
        <div className="flex flex-col items-center gap-5">
          <h2 className="text-5xl tracking-wide">
            Share Code in Real-time with Developers
          </h2>
          <p className="my-4 text-2xl tracking-wide text-gray-200">
            An Online Code editor for interviews, troubleshooting, teaching &
            more...
          </p>
          <Button onClick={handleNavigate}>Share Code Now</Button>
          <small>Share Code for free.</small>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="box-1 h-[25rem] w-[45rem] bg-pink-400">
            <img
              className="h-full w-full object-fill"
              src={myImage}
              alt="imaeg"
            />
          </div>
          <div className="space-y-3">
            <div className="box-2 h-48 w-96 bg-red-500">
              <img
                className="h-full w-full object-fill"
                src={myImage}
                alt="imaeg"
              />
            </div>
            <div className="box-3 h-48 w-96 bg-green-500">
              <img
                className="h-full w-full object-fill"
                src={myImage}
                alt="imaeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
