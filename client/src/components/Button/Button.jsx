import React, { Children } from 'react'

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-700 hover:bg-gray-800 text-white",
    outline: "border border-gray-500 text-white hover:bg-gray-800",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
