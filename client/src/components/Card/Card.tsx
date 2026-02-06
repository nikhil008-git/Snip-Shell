import { useEffect, useState } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import BlueAlert from "../Alert/BlueAlert";

interface CardProps {
  title: string | number;
  link: string;
  type: "twitter" | "youtube" | "url" | "all";
  description?: string | number;
  onDelete: () => void;
  onEdit?: () => void;
}

const Loader = () => (
  <div className="py-4 text-center text-gray-400 animate-pulse font-instrument">
    Loading...
  </div>
);

const FIXED =
  "z-0 w-[340px] h-[420px] p-4 rounded-lg border border-black/10 bg-white/30 \
backdrop-blur-md text-black shadow-xl hover:bg-gray-100 cursor-pointer transition-all font-instrument";

const Card = ({ title, link, type, description, onDelete, onEdit }: CardProps) => {
  const [loading, setLoading] = useState(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    <BlueAlert add="Link copied!" />;
  };

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => setLoading(false);
      document.body.appendChild(script);
    }
  }, [type]);

  return (

    <div className={FIXED + " overflow-auto"}>
      
  <h2 className="text-xl font-bold font-instrument">{title}</h2>
  <p className="text-black-300 font-thin mt-1 line-clamp-2 font-instrument">
    {description}
  </p>

  {/* URL */}
  {type === "url" && !loading && (
    <a
      href={link}
      target="_blank"
      className="text-blue-400 underline mt-3 cursor-pointer font-instrument block break-words"
    >
      Visit Link
    </a>
  )}

  {/* YouTube */}
  {type === "youtube" && (
    <div className="mt-3 w-full h-[230px] overflow-hidden rounded">
      <iframe
        className="w-full h-full"
        src={
          link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
            ? `https://www.youtube.com/embed/${link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)![1]}`
            : link
        }
        allowFullScreen
      />
    </div>
  )}

  {/* Twitter/X */}
  {type === "twitter" && (
    <div className="mt-3 w-full overflow-hidden">
      <blockquote className="twitter-tweet max-w-full">
        <a href={link.includes("x.com") ? link.replace("x.com", "twitter.com") : link}></a>
      </blockquote>
    </div>
  )}

  <div className="flex gap-2 mt-3">
    <button
      onClick={handleCopy}
      className="text-blue-400 border border-black-400 px-2 py-1 rounded cursor-pointer font-instrument"
    >
      <FaRegCopy />
    </button>
    {onEdit && (
      <button
        onClick={onEdit}
        className="bg-blue-400 text-white px-2 py-1 rounded cursor-pointer font-instrument"
      >
        Edit
      </button>
    )}
    <button
      onClick={onDelete}
      className="bg-red-400 text-black border border-red-400 px-2 py-1 rounded cursor-pointer font-instrument"
    >
      <MdOutlineDeleteSweep />
    </button>
  </div>

  <p className="text-sm text-gray-400 mt-2">{type}</p>
</div>

  );
};

export default Card;
