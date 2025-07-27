import { useState } from "react";
import CreateAccountModal from "../components/SignUpModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-col text-center">
        <h1 className="text-3xl text-green-700  font-bold p-4">
          Tandem Match<span className="text-lg align-super ml-1">™</span>
        </h1>
        <p className="text-xl text-agreen-600 font-bold italic p-4">
          Find your local language partner.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center p-20 ">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Sign up
        </button>
        {showModal && (
          <CreateAccountModal onClose={() => setShowModal(false)} />
        )}
      </div>
    </>
  );
};

export default Home;
