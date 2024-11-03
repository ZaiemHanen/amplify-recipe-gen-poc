import React from 'react';

export const Card: React.FC<React.HTMLProps<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div className={`card ${className || ''}`} {...props}>
    {children}
  </div>
);

export const Input: React.FC<{
  label?: string;
  multiline?: boolean;
  rows?: number;
  [key: string]: any;
}> = ({ label, multiline, rows = 4, ...props }) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    {multiline ? (
      <textarea rows={rows} {...props} />
    ) : (
      <input {...props} />
    )}
  </div>
);

export const Button: React.FC<{
  loading?: boolean;
  children: React.ReactNode;
  [key: string]: any;
}> = ({ loading, children, ...props }) => (
  <button className={`btn ${loading ? 'loading' : ''}`} {...props}>
    {loading ? 'Loading...' : children}
  </button>
);

export const Select: React.FC<{
  label?: string;
  options: Array<{ value: string; label: string }>;
  [key: string]: any;
}> = ({ label, options, ...props }) => (
  <div className="input-wrapper">
    {label && <label>{label}</label>}
    <select {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);