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
}

const Loader = () => (
  <div className="py-4 text-center text-gray-400 animate-pulse font-instrument">
    Loading...
  </div>
);
const FIXED =
  "z-0 w-[340px] h-[420px] p-4 rounded-lg border border-black/10 bg-white/30 \
backdrop-blur-md text-black shadow-xl hover:bg-gray-100 cursor-pointer transition-all font-instrument";

const Card = ({ title, link, type, description, onDelete }: CardProps) => {
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

  if (type === "url") {
    return (
      <div className={FIXED}>
        <h2 className="text-xl font-bold font-instrument">{title}</h2>

        <p className="text-black-300 font-thin mt-1 line-clamp-2 font-instrument">
          {description}
        </p>

        {loading ? (
          <div className="w-full h-[180px] mt-4 bg-gray-300 rounded-lg animate-pulse"></div>
        ) : (
          <a
            href={link}
            target="_blank"
            className="text-blue-400 underline mt-3 cursor-pointer font-instrument block"
          >
            Visit Link
          </a>
        )}

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-blue-400 mt-2 border border-black-400 px-2 py-1 rounded cursor-pointer font-instrument"
        >
          <FaRegCopy />{" "}
        </button>

        <p className="text-sm text-gray-400 mt-2 mb-2">{type}</p>
        <button
          onClick={onDelete}
          className="flex items-center gap-1 bg-red-400 text-black border border-red-400 px-2 py-1 rounded cursor-pointer"
        >
          <MdOutlineDeleteSweep />
        </button>
      </div>
    );
  }

  if (type === "youtube") {
    const id = link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const embed = id ? `https://www.youtube.com/embed/${id[1]}` : link;

    return (
      <div className={FIXED}>
        <h2 className="text-xl font-bold font-instrument">{title}</h2>
        <p className="text-black-300 font-thin mt-1  font-instrument">
          {description}
        </p>

        {loading && <Loader />}

        <iframe
          className={`w-full h-[230px] mt-3 rounded ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          src={embed}
          onLoad={() => setLoading(false)}
          allowFullScreen
        />

        <button
          onClick={handleCopy}
          className="mt-3 text-blue-400 border border-black-400 px-2 py-1 rounded cursor-pointer font-instrument"
        >
          <FaRegCopy />
        </button>

        <div className="mt-auto font-instrument">
          <p className="text-sm text-gray-400 mt-2">{type}</p>
          <button
            onClick={onDelete}
            className="mt-3 text-black-400 bg-red-400 border border-red-400 px-2 py-1 rounded cursor-pointer"
          >
            <MdOutlineDeleteSweep />
          </button>
        </div>
      </div>
    );
  }

  if (type === "twitter") {
    const twitterUrl = link.includes("x.com")
      ? link.replace("x.com", "twitter.com")
      : link;

    return (
      <div className={`${FIXED} overflow-y-auto`}>
        <h2 className="text-xl font-bold font-instrument">{title}</h2>
        <p className="text-black-300 font-thin mt-1 line-clamp-2 font-instrument">
          {description}
        </p>

        {loading && <Loader />}

        <blockquote className="twitter-tweet mt-3">
          <a href={twitterUrl}></a>
        </blockquote>

        <button
          onClick={handleCopy}
          className="mt-3 text-blue-400 border border-black-400 hover:bg-black px-2 py-1 rounded cursor-pointer font-instrument"
        >
          <FaRegCopy />
        </button>

        <div className="mt-auto font-instrument">
          <p className="text-sm text-gray-400 mt-2">{type}</p>
          <button
            onClick={onDelete}
            className="mt-3 text-black-400 bg-red-400 border border-red-400 px-2 py-1 rounded cursor-pointer"
          >
            <MdOutlineDeleteSweep />
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
