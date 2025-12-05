  import React, { useState, useEffect } from "react";
  import Sidebar from "../layout/Sidebar";
  import Modal from "../components/modal/Modal";
  import { useContent } from "../hooks/AddContext";
  import Card from "../components/Card/Card";
  import axios from "axios";
  // import { data } from "react-router-dom";
  interface CardData {
    _id : string
    title: string;
    link: string;
    type: "twitter" | "youtube" | "url" | "all";
    description?: string;
    onDelete: () => void;  

  }
  const Dashboard = () => {
    
    
    const { content } = useContent();
    const [showModal, setShowModal] = useState(false);
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
      await axios.delete(`http://localhost:3000/api/content`, {
        headers: { Authorization: `${token}` },
        data: { contentId: id },
      });

      
      setItems(prev => prev.filter(item => item._id !== id)); //we can even use items.filter to remove deleted item from UI without refetching
    } catch (err) {
      console.log(err);
      alert("Failed to delete");
    }
  };


    const fetchContent = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in");
        return;
      }
      
      try {
        const response = await axios.get("http://localhost:3000/api/content", {
          headers: { Authorization: `${token}` },
        });
        setItems(response.data); // setItems(response.data.content) only if backend wraps array in { content: [...] }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch content");
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


    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in");
        return;
      }

      try {
        
        await content(formData); // or replace with axios.post if useContent isn't posting directly
        setShowModal(false);

        await fetchContent();

        // Reset form
        setFormData({ title: "", link: "", type: "", description: "" });
      } catch (err) {
        console.error(err);
        alert("Failed to add content");
      }
    };

    return (
      <>
      <Sidebar />
      <div className="ml-75">
      <div className="flex flex-row">
        <div className="h-screen w-full bg-[url('/squares.png')] bg-no-repeat bg-top bg-[length:900px_700px]">
          <div className="border border-black h-screen rounded-l-sm p-4">
            <button onClick={() => setShowModal(true)}>Add Content</button>
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
    <option value="" disabled>Select Type*</option>
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
        className="bg-black text-white p-2 rounded-md font-instrument hover:bg-gray-700"
      >
        Submit
      </button>

    </form>
  </Modal>


            <div className="mt-4 space-y-2">
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
            </div>
  <button
    className="mt-4 border border-black text-white bg-black h-10 w-18 text-xl rounded-sm"
    onClick={async () => {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:3000/api/brain/share",
        { share: "true" },       
        {
          headers: {
            Authorization: `${token}`,   
          },
        }
      );

      const sharedUrl = `http://localhost:5173/share/${res.data.hash}`;
      alert(`Shareable Link: ${sharedUrl}`);
    }}
  >
    Share
  </button>

          </div>
        </div>
    
  </div>
      </div>
      </>
    );
  };

  export default Dashboard;
