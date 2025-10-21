import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [autoScroll, setAutoScroll] = useState(false);

  return (
    <VideoContext.Provider value={{ autoScroll, setAutoScroll }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);
