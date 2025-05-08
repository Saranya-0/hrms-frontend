import React from 'react';

export const Input = ({ label, name, type, placeholder, register, errors }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label
      htmlFor={name}
      style={{
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151'
      }}
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      {...register}
      style={{
        width: '100%',
        padding: '0.5rem 0.75rem',
        marginTop: '0.25rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        outline: 'none',
        boxSizing: 'border-box',
        fontSize: '1rem',
      }}
      onFocus={(e) => (e.target.style.boxShadow = '0 0 0 2px #3b82f6')} 
      onBlur={(e) => (e.target.style.boxShadow = 'none')}
    />
    {errors && (
      <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
        {errors}
      </p>
    )}
  </div>
);
