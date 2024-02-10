import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  as = "button",
  variant,
  children,
  onClick,
  href,
  className
}) {
  return (
    <>
      {as === "button" ? (
        <button
          className={`bg-teal-500 text-white py-2 px-4 rounded-md ${
            variant == "outline"
              ? "bg-transparent !text-teal-500 hover:bg-teal-500/20"
              : ""
          }
      transition-all hover:scale-105 ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <Link
          className={`bg-teal-500 text-white py-2 px-4 rounded-md ${
            variant == "outline"
              ? "bg-transparent !text-teal-500 hover:bg-teal-500/20"
              : ""
          }
      transition-all hover:scale-105 ${className}`}
          to={href}
        >
          {children}
        </Link>
      )}
    </>
  );
}
