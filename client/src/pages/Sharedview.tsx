import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card/Card"; // cards imported coollll

const API_URL = import.meta.env.VITE_API_URL ;

interface CardData {
  _id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube" | "url" | "all";
  description?: string;
}

const SharedDashboard = () => {
  const { hash } = useParams<{ hash: string }>();
  const [items, setItems] = useState<CardData[]>([]);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/brain/share/${hash}`
        );
        setItems(response.data.content);
        setUsername(response.data.username || "User");
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch shared content");
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  if (loading) return <div>Loading...</div>;
  if (!items.length) return <div>No content available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 font-instrument">view {username}&apos;s Snip-shell</h1>
      <div className="flex flex-wrap gap-4">
        {items.map((card) => (
          <Card
            key={card._id}
            title={card.title}
            link={card.link}
            type={card.type}
            description={card.description}
            onDelete={() => {}} // dont want to delete by shared pppll
          />
        ))}
      </div>
    </div>
  );
};

export default SharedDashboard;
