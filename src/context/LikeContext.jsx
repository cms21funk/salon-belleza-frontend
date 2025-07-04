import { createContext, useContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export const useLikes = () => useContext(LikeContext);

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState({});

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
    setLikes(storedLikes);
  }, []);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] ? 0 : 1
    }));
  };

  const isLiked = (id) => likes[id] === 1;
  const getLikeCount = (id) => (likes[id] || 0);

  return (
    <LikeContext.Provider value={{ toggleLike, isLiked, getLikeCount }}>
      {children}
    </LikeContext.Provider>
  );
};
