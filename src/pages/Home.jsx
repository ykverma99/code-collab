import Navbar from "../components/navbar/Navbar";

const Home = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-800 from-30% to-blue-500">
      <Navbar links={true} />
      <p>hello</p>
    </div>
  );
};

export default Home;
