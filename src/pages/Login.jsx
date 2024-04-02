import { useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputCntroller/Input";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";
import useUser from "../hooks/useUser";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("typing");
  const [error, seterror] = useState(null);
  const { login } = useUser();
  const handleForm = async (e) => {
    e.preventDefault();
    setstatus("processing");
    seterror("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PORT}/user/api/login`,
        {
          email: email,
          password: password,
          name: name,
        },
      );
      const data = res.data;
      if (res.status == 200) {
        setemail("");
        setpassword("");
        setstatus("done");
        login(data.body);
      }
    } catch (error) {
      seterror(error.response.data.msg);
      setstatus("error");
    }
  };
  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleForm}
        className="flex h-[70vh] flex-col items-center justify-center gap-3"
      >
        <h2 className="mb-2 text-6xl font-medium">
          Log in to access your saved code
        </h2>
        <Input
          onChange={(e) => setemail(e.target.value)}
          value={email}
          label={"Email address"}
          id={"email"}
        />
        <Input
          onChange={(e) => setpassword(e.target.value)}
          value={password}
          label={"Password"}
          id={"password"}
          type={"password"}
        />
        {error && (
          <small className="w-96 text-left text-red-500">{error}</small>
        )}
        <div className="mt-4">
          {status === "processing" ? (
            <Button
              disabled={true}
              leftIcon={<LuLoader2 size={25} className="animate-spin" />}
              type="submit"
              className={"w-96"}
            >
              {status}...
            </Button>
          ) : (
            <Button type="submit" className={"w-96"}>
              Sign Up
            </Button>
          )}
        </div>
        <div>
          <span>
            New to Codyshare?{" "}
            <Link to={"/signup"} className="text-blue-600 underline ">
              Sign up here
            </Link>
            .
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
