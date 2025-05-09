import React from 'react';

export const Button = ({ type = 'button', onClick, disabled, children, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};
