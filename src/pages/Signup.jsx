import { useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputCntroller/Input";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";
import useUser from "../hooks/useUser";

const Signup = () => {
  const [name, setname] = useState("");
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
        `${import.meta.env.VITE_PORT}/user/api/signup`,
        {
          email: email,
          password: password,
          name: name,
        },
      );
      const data = res.data;
      console.log(res, data);
      if (res.status == 201) {
        setemail("");
        setname("");
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
        className="flex h-[80vh] flex-col items-center justify-center gap-3"
      >
        <h2 className="mb-2 text-6xl font-semibold">Sign up to save code</h2>
        <Input
          onChange={(e) => setname(e.target.value)}
          value={name}
          label={"Your full name"}
          id={"name"}
        />
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
            Already signed up?{" "}
            <Link to={"/login"} className="text-blue-600 underline ">
              Login in here
            </Link>
            .
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
