import { useState } from "react";
import axios from "axios";
import BlueAlert from "../Alert/BlueAlert";
import RedAlert from "../Alert/RedAlert";

const API_URL = import.meta.env.VITE_API_URL;

const ShareModalContent = () => {
  const [shareLink, setShareLink] = useState("");

  const handleShare = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/brain/share`,
        { share: "true" },
        {
          headers: { Authorization: `${token}` },
        }
      );

      const url = `http://localhost:5173/share/${res.data.hash}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(url);

      // Set link to display
      setShareLink(url);

      // Friendly alert
      <BlueAlert add="copied to clipboard!" />;
    } catch (error) {
      console.error("Error sharing collection:", error);
      <RedAlert add="Failed to copy link. Please try again." />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* <h2 className="text-lg font-semibold">Share Your Collection</h2> */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          onClick={handleShare}
          className="
    bg-white text-black 
    text-sm sm:text-base md:text-lg 
    px-4 md:px-6 
    py-2 md:py-3
    rounded-md font-thin
    transition-all duration-200
    hover:bg-gray-200 hover:text-black
    cursor-pointer border-b border-black-900 border-t
    font-instrument
  "
        >
          Generate Shareable Link
        </button>

        {shareLink && (
          <a
            href={shareLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all sm:ml-2 border border-black-100 px-2 py-1 rounded font-"
          >
            {shareLink}
          </a>
        )}
      </div>
    </div>
  );
};

export default ShareModalContent;
