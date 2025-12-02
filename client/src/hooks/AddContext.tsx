import React, { useContext, createContext } from 'react';
import axios from 'axios';

interface ContentData {
  title: string;
  type: string;
  link: string;
  description: string;
}

interface AddContextType {
  content: (data: ContentData) => Promise<void>;
}

const AddContext = createContext<AddContextType | null>(null);

export const AddProvider = ({ children }: { children: React.ReactNode }) => {
  const content = async (data: ContentData) => { // we can use ({ title, link, type, description }: ContentData) here too
    // Get JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not logged in");
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/content', 
        data, // send data directly or  { title, link, type, description }, // directly create object here
        {
          headers: {
            Authorization: `${token}` // must include Bearer
          }
        }
      );

      alert("Content added successfully!");
    } catch (error: unknown) {
      console.error("Error adding content:", error);
    
    }
  };

  return (
    <AddContext.Provider value={{ content }}>
      {children}
    </AddContext.Provider>
  );
};
//eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => {
  const context = useContext(AddContext);
  if (!context) throw new Error("useContent must be used within an AddProvider");
  return context;
};
