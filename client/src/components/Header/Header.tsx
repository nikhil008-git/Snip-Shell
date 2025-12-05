import  React, { useState } from "react";
import { VscGithub } from "react-icons/vsc";
import { DiYii } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import Modal from "../modal/Modal";
import { useAuth } from "../../hooks/AuthContext";
import RedAlert from "../Alert/RedAlert";
// import BlueAlert from "../Alert/BlueAlert";
function Header() {
  const navigate = useNavigate();
  const { Signin, Signup } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [showSignupModal, setShowSignupModal] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = ( e : React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await Signin(formData);
    if (!result.ok) return <RedAlert add={result.message || "Signin failed"} />;
    setShowModal(false);
    navigate("/dashboard");
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await Signup(signupData);
    if (!result.ok) return <RedAlert add={result.message || "Signup failed"} />;
    setShowSignupModal(false);
    setShowModal(true);
  };

  return (
    <div className="fixed w-full backdrop-blur bg-white/5">
      <div className="hidden bg-white/10 h-10 backdrop-blur md:flex md:justify-between lg:justify-between lg:px-130 items-center items-center cursor-pointer shadow-sm">
        <div><DiYii /></div>

        <div className="flex flex-row gap-4 items-center">
          <a href="https://github.com/nikhil008-git/Snip-Shell" target="_blank" rel="noopener noreferrer">
            <VscGithub />
          </a>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit}>
                            <div className="flex flex-row mx-12 text-xl font-instrument  ">Login to the brain</div>

              <div className="flex flex-col p-4 gap-3 w-60">
                <input className="border p-2 font-inter text-xs" type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input className="border p-2 font-inter text-xs" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit" className="bg-black text-white p-2 font-instrument rounded-md hover:bg-gray-700">Signin</button>
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    setShowModal(false);
                    setShowSignupModal(true);
                  }}
                >
                  Create new account
                </button>
              </div>
            </form>
          </Modal>

          <button
            onClick={() => setShowModal(true)} 
            className="hover:bg-gray-700 border bg-black text-white border-gray-500 h-7 w-16 rounded-sm text-sm flex items-center justify-center font-instrument font-thin text-lg"
          >
            Signin
          </button>

          <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
            <form onSubmit={handleSignupSubmit}>
              <div className="flex flex-row mx-12 text-xl font-instrument  ">Welcome to Snip-Shell</div>
              <div className="flex flex-col p-4 gap-3 w-60">
                <input className="border p-2 font-inter text-xs" type="text" name="username" value={signupData.username} onChange={handleSignupChange} placeholder="Username" />
                <input className="border p-2 font-inter text-xs" type="text" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Email" />
                <input className="border p-2 font-inter text-xs" type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Password" />
                <button type="submit" className="bg-black text-white p-2 rounded-md font-instrument hover:bg-gray-700">Signup</button>

                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    setShowSignupModal(false);
                    setShowModal(true);
                  }}
                >
                  Already have account
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </div>

      <div className="md:hidden flex justify-between p-2 bg-white/10 backdrop-blur">
        <div><DiYii /></div>

        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "X" : "☰"}</button>

        {isOpen && (
          <div className="absolute top-12 right-2 bg-white w-full flex flex-col justify-center items-center border p-2 flex flex-col gap-3 shadow-md">
            <button onClick={() => setShowModal(true)}  className="hover:bg-gray-100 border border-gray-500 h-7 w-full rounded-sm text-sm flex items-center justify-center font-instrument font-thin text-lg">Signin</button>
               <Modal show={showModal} onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit}>
                            <div className="flex flex-row mx-12 text-xl font-instrument  ">Login to the brain</div>

              <div className="flex flex-col p-4 gap-3 w-60">
                <input className="border p-2 font-inter text-xs" type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input className="border p-2 font-inter text-xs" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                <button type="submit" className="bg-black text-white p-2 font-instrument rounded-md hover:bg-gray-700">Signin</button>
                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    setShowModal(false);
                    setShowSignupModal(true);
                  }}
                >
                  Create new account
                </button>
              </div>
            </form>
          </Modal>

            <button onClick={() => setShowSignupModal(true)}  className="hover:bg-gray-600 border border-gray-500 h-7 w-full bg-black text-white rounded-sm text-sm flex items-center justify-center font-instrument font-thin text-lg">Signup</button>
            
          <Modal show={showSignupModal} onClose={() => setShowSignupModal(false)}>
            <form onSubmit={handleSignupSubmit}>
              <div className="flex flex-row mx-12 text-xl font-instrument  ">Welcome to Snip-Shell</div>
              <div className="flex flex-col p-4 gap-3 w-60">
                <input className="border p-2 font-inter text-xs" type="text" name="username" value={signupData.username} onChange={handleSignupChange} placeholder="Username" />
                <input className="border p-2 font-inter text-xs" type="text" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Email" />
                <input className="border p-2 font-inter text-xs" type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Password" />
                <button type="submit" className="bg-black text-white p-2 rounded-md font-instrument hover:bg-gray-700">Signup</button>

                <button
                  type="button"
                  className="text-sm underline"
                  onClick={() => {
                    setShowSignupModal(false);
                    setShowModal(true);
                  }}
                >
                  Already have account
                </button>
              </div>
            </form>
          </Modal>

          </div>
        )}
      </div>
      
    </div>
  );
}

export default Header;
