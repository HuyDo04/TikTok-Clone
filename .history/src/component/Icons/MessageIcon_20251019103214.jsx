import React from 'react';

const MessageIcon = ({ width = '1em', height = '1em', color = 'currentColor', className = '', ...props }) => (
  <svg
    fill={color}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
    {...props}
  >
    <path d="M2.18 9.67A2 2 0 0 1 4 8.5h40a2 2 0 0 1 1.74 3l-20 35a2 2 0 0 1-3.65-.4l-5.87-18.6L2.49 11.82a2 2 0 0 1-.31-2.15Zm18.2 17.72 4.15 13.15L40.55 12.5H8.41l9.98 11.41 11.71-7.2a1 1 0 0 1 1.38.32l1.04 1.7a1 1 0 0 1-.32 1.38L20.38 27.4Z"></path>
  </svg>
);

export default MessageIcon;
