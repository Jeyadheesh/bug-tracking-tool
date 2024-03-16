import React from "react";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function Button({ children, disabled, loading, className, ...props }: Props) {
  return (
    <button
      disabled={disabled || loading}
      className={twMerge(
        " w-max px-10 py-2 justify-center shadow-md disabled:cursor-not-allowed flex gap-4 active:scale-95 transition-all rounded-lg font-semibold bg-gradient-to-br from-primary to-primary-varient text-white ",
        className
      )}
      {...props}
    >
      {children}
      {/* Spinner */}
      {loading && (
        <div className="m-auto ml-4 h-5 w-5 animate-spin rounded-full border border-white border-t-primary" />
      )}
    </button>
  );
}

export default Button;
