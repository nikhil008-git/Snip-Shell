import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Modal from "../components/modal/Modal";
import { useContent } from "../hooks/AddContext";
import Card from "../components/Card/Card";
import axios from "axios";

interface CardData {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "other";
  description?: string;
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

  // Reusable function to fetch content from backend
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
fetchContent();
    
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      // Send new content to backend
      await content(formData); // or replace with axios.post if useContent isn't posting directly
      setShowModal(false);

      // Refresh dashboard after adding content
      await fetchContent();

      // Reset form
      setFormData({ title: "", link: "", type: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add content");
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="h-screen w-full bg-[url('/squares.png')] bg-no-repeat bg-top bg-[length:900px_700px]">
        <div className="border border-black h-screen rounded-l-sm p-4">
          <button onClick={() => setShowModal(true)}>Add Content</button>

          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="link"
                placeholder="Link"
                value={formData.link}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </Modal>

          <div className="mt-4 space-y-2">
            {items.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                link={card.link}
                type={card.type}
                description={card.description}
              />
            ))}
          </div>

          <button className="mt-4">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
