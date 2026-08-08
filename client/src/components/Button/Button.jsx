import React, { Children } from 'react'

function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
}) {
  const variants = {
  primary:
    "bg-[#98CCF8] hover:bg-[#6296BF] text-[#003450]",

  secondary:
    "bg-gray-700 hover:bg-gray-800 text-white",

  outline:
    "border border-[#4A7FA7] text-[#B3CFE5] hover:bg-[#1A3D63]",
};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-7 py-3.5 font-medium transition-all duration-300 ${variants[variant] || variants.primary}`}
    >
      {children}
    </button>
  );
}

export default Button;
