import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Modal from "../components/modal/Modal";
import { useContent } from "../hooks/AddContext";
import Card from "../components/Card/Card";
import axios from "axios";
import ShareModalContent from "../components/modal/ShareModalContent";
import { motion } from "motion/react"
const API_URL = import.meta.env.VITE_API_URL;
// import RedAlert from "../components/Alert/RedAlert";
interface CardData {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "url" | "all";
  description?: string;
  onDelete: () => void;
}

const Dashboard = () => {
  const { content } = useContent();
  const [showModal, setShowModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "",
    description: "",
  });

  const [items, setItems] = useState<CardData[]>([]);

  const deleteHandle = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${API_URL}/content`, {
        headers: { Authorization: `${token}` },
        data: { contentId: id },
      });

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    alert("Failed to delete")
    }
  };

  const fetchContent = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
     alert("You must be logged in")
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/content`, {
        headers: { Authorization: `${token}` },
      });

      setItems(response.data);
    } catch (err) {
      console.error(err);
     alert("Failed to fetch content")
    }
  };

  useEffect(() => {
    //eslint-disable-next-line
    fetchContent();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in")
      return;
    }

    try {
      await content(formData);
      setShowModal(false);
      await fetchContent();

      setFormData({ title: "", link: "", type: "", description: "" });
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
    <>
      <Sidebar />
<div className=" h-screen w-full 
">
      <div className="md:ml-75 pt-20  max-md:ml-0 md:p-4 ">

        <div className="flex flex-row items-center justify-start gap-4 mb-4 max-md:flex-col max-md:items-start">
         <button
  onClick={() => setShowModal(true)}
  className="
    bg-black text-white 
    text-sm sm:text-base md:text-lg 
    px-5 sm:px-4 md:px-6 
    py-2 md:py-2 ml-5
    rounded-md font-semibold
    transition-all duration-200
    hover:bg-gray-800 font-instrument font-thin cursor-pointer
  "
>
  Add Collection
</button>

          <button onClick={() => setShareModal(true)}    className="
    bg-black text-white 
    text-sm sm:text-base md:text-lg 
    px-5 sm:px-4 md:px-6 
    py-2 md:py-2 ml-5
    rounded-md font-semibold
    transition-all duration-200
    hover:bg-gray-800 font-instrument font-thin cursor-pointer
  "> share </button>
<Modal show={shareModal} onClose={() => setShareModal(false)}>
  
   <ShareModalContent />
          </Modal>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-60 p-4">
            <input
              className="border p-2 font-inter text-xs"
              type="text"
              name="title"
              placeholder="Title*"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              className="border p-2 font-inter text-xs"
              type="text"
              name="link"
              placeholder="Link*"
              value={formData.link}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 font-inter text-xs bg-white"
              required
            >
              <option value="" disabled>
                Select Type*
              </option>
              <option value="twitter">Twitter</option>
              <option value="youtube">YouTube</option>
              <option value="url">URL</option>
            </select>

            <input
              className="border p-2 font-inter text-xs"
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-black text-white p-2 rounded-md font-instrument"
            >
              Submit
            </button>
          </form>
        </Modal>
<motion.div
  className="mt-4 flex flex-row ml-5 flex-wrap gap-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  {items.map((card) => (
    <Card
      key={card._id}
      title={card.title}
      link={card.link}
      type={card.type}
      description={card.description}
      onDelete={() => deleteHandle(card._id)}
    />
  ))}
</motion.div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
