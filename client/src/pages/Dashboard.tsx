import React, { useState, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Modal from "../components/modal/Modal";
import { useContent } from "../hooks/AddContext";
import Card from "../components/Card/Card";
import axios from "axios";
import ShareModalContent from "../components/modal/ShareModalContent";
import { motion } from "motion/react";
import { API_URL } from "../utils/constants";

interface CardData {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "url" | "all";
  description?: string;
}

const Dashboard = () => {
  const { content } = useContent();
const[loading,setLoading] = useState(false);
  const [items, setItems] = useState<CardData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    type: "",
    description: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch all content for user
  const fetchContent = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      const res = await axios.get(`${API_URL}/api/content`, {
        headers: { Authorization: token },
      });
      setLoading(true);
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch content");
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Delete content
  const deleteHandle = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
      await axios.delete(`${API_URL}/api/content`, {
        headers: { Authorization: token },
        data: { contentId: id },
      });
      setLoading(true);
      setItems((prev) => prev.filter((item) => item._id !== id));
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  // Open modal with card data for editing
  const handleEdit = (card: CardData) => {
    setIsEditing(true);
    setEditingId(card._id);
    setFormData({
      title: card.title,
      link: card.link,
      type: card.type,
      description: card.description || "",
    });
    setShowModal(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update content
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in");

    try {
    if (isEditing && editingId) {
  // Update content
  await axios.put(
    `${API_URL}/api/content`,
    { contentId: editingId, ...formData },
    { headers: { Authorization: token } }
  );
} else {
  // **Add new content POST request**
  await axios.post(
    `${API_URL}/api/content`,
    formData,
    { headers: { Authorization: token } }
  );
}
      

      setShowModal(false);
      setIsEditing(false);
      setEditingId(null);
      setFormData({ title: "", link: "", type: "", description: "" });
      await fetchContent();
    } catch (err) {
      console.error(err);
      alert("Failed to submit content");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="h-screen w-full">
        <div className="md:ml-75 pt-20 max-md:ml-0 md:p-4">
          <div className="flex flex-row items-center justify-start gap-4 mb-4 max-md:flex-col max-md:items-start">
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({ title: "", link: "", type: "", description: "" });
                setShowModal(true);
              }}
              className="bg-black text-white text-sm sm:text-base md:text-lg px-5 sm:px-4 md:px-6 py-2 md:py-2 ml-5 rounded-md font-semibold transition-all duration-200 hover:bg-gray-800 font-instrument font-thin cursor-pointer"
            >
              Add Collection
            </button>

            <button
              onClick={() => setShareModal(true)}
              className="bg-black text-white text-sm sm:text-base md:text-lg px-5 sm:px-4 md:px-6 py-2 md:py-2 ml-5 rounded-md font-semibold transition-all duration-200 hover:bg-gray-800 font-instrument font-thin cursor-pointer"
            >
              Share
            </button>

            <Modal show={shareModal} onClose={() => setShareModal(false)}>
              <ShareModalContent />
            </Modal>
          </div>

          {/* Add/Edit Modal */}
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 w-60 p-4"
            >
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
                {isEditing ? "Update" : "Submit"}
              </button>
            </form>
          </Modal>

          {/* Cards */}
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
                onEdit={() => handleEdit(card)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
