import React from "react";

interface CardProps {
  title: string | number;
  link: string;
  type: "twitter" | "youtube" | "other";
  description?: string | number;
}

const Card = ({ title, link, type, description }: CardProps) => {
  if (type === "other") {
    return (
      <div className="border border-black p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>
        <a href={link} target="_blank" className="text-blue-600 underline block mt-2">
          Visit Link
        </a>
        <p className="text-sm text-gray-500 mt-2">{type}</p>
      </div>
    );
  }

  if (type === "youtube") {
    return (
      <div className="border border-red-600 p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>
        <a href={link} target="_blank" className="text-red-600 underline block mt-2">
          Visit YouTube Link
        </a>
        <p className="text-sm text-gray-500 mt-2">{type}</p>
      </div>
    );
  }

  if (type === "twitter") {
    return (
      <div className="border border-blue-600 p-4 rounded-lg bg-white shadow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700 mt-1">{description}</p>
        <a href={link} target="_blank" className="text-blue-600 underline block mt-2">
          Visit Twitter Link
        </a>
        <p className="text-sm text-gray-500 mt-2">{type}</p>
      </div>
    );
  }

  return null; // fallback it is then 
};

export default Card;
