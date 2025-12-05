import React, { useEffect, useState } from "react";

interface CardProps {
  title: string | number;
  link: string;
  type: "twitter" | "youtube" | "url" | "all";
  description?: string | number;
  onDelete: () => void;
}

const Loader = () => (
  <div className="py-4 text-center text-gray-400 animate-pulse">
    Loading...
  </div>
);

const FIXED_CARD =
  "w-[350px] h-[420px] p-4 rounded-lg shadow overflow-hidden flex flex-col";

const Card = ({ title, link, type, description, onDelete }: CardProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type !== "twitter") return;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => setLoading(false);
    document.body.appendChild(script);
  }, [type, link]);

  if (type === "url") {
    return (
      <div className={`${FIXED_CARD} bg-black text-white border border-black`}>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-400 mt-1 line-clamp-2">{description}</p>

          {loading ? (
            <div className="h-4 w-24 bg-gray-700 animate-pulse rounded mt-3"></div>
          ) : (
            <a
              href={link}
              target="_blank"
              className="text-blue-400 underline block mt-3"
            >
              Visit Link
            </a>
          )}

          <a href={link} className="text-sm underline mt-2 block">
            checkout the saved url
          </a>
        </div>

        <div className="mt-auto">
          <p className="text-sm text-gray-500 mt-2">{type}</p>

          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-3 text-red-500 border border-red-500 px-2 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === "youtube") {
    const videoIdMatch = link.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const embedUrl = videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : link;

    return (
      <div
        className={`${FIXED_CARD} bg-black text-white border border-red-600`}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-400 mt-1 line-clamp-2">{description}</p>

        {loading && <Loader />}

        <iframe
          className={`w-full h-[230px] mt-3 rounded transition-opacity duration-300 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          src={embedUrl}
          onLoad={() => setLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <div className="mt-auto">
          <p className="text-sm text-gray-500 mt-2">{type}</p>
          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-3 text-red-500 border border-red-500 px-2 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === "twitter") {
    const twitterUrl = link.includes("x.com")
      ? link.replace("x.com", "twitter.com")
      : link;

    return (
      <div
        className={`${FIXED_CARD} bg-white text-black border border-blue-600 overflow-y-auto`}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700 mt-1 line-clamp-2">{description}</p>

        {loading && <Loader />}

        <blockquote className="twitter-tweet mt-3">
          <a href={twitterUrl}></a>
        </blockquote>

        <div className="mt-auto">
          <p className="text-sm text-gray-500 mt-2">{type}</p>
          {onDelete && (
            <button
              onClick={onDelete}
              className="mt-3 text-red-600 border border-red-600 px-2 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default Card;
