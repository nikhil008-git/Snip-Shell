import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
          `http://localhost:3000/api/brain/share/${hash}`
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
      <h1 className="text-2xl font-bold mb-4">{username}&apos;s Shared Brain</h1>
      <div className="space-y-4">
        {items.map((card) => (
          <div key={card._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{card.title}</h2>
            <p>{card.description}</p>
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Visit Link
            </a>
            <p className="text-sm text-gray-500">Type: {card.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedDashboard;
