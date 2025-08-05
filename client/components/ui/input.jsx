import useInput from "@/hooks/useInput";
import React from "react";

export const Input = ({
  type,
  label,
  value,
  onChange,
  onBlur,
  hasError,
  isValid,
  errorMessage,
}) => {
  return (
    <div className={`flex flex-col ${hasError ? "animate-shake" : ""}`}>
      {label && (
        <label
          className={`mb-2 text-sm text-gray-600 ${
            hasError ? "text-red-500" : ""
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border-gray-800 border p-2 rounded ${
          hasError ? "border-red-500 bg-red-100" : ""
        }`}
      />
      {hasError && (
        <p className="text-red-500 text-xs mt-1 animate-drop">{errorMessage}</p>
      )}
    </div>
  );
};
