import React from 'react';

export const Button = ({ type, variant, onClick, disabled, children, className = '' }) => {
  const baseClass = 'btn'; 
  const variantClass = variant === 'primary' ? 'primary' : 'secondary';
  const disabledClass = disabled ? 'disabled' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${disabledClass} ${className}`.trim()}>
      {children}
    </button>
  );
};
