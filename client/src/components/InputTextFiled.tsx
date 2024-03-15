import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  value: string | undefined;
  setValue: (val: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
};

const InputTextFiled = ({
  icon,
  setValue,
  value,
  placeholder,
  type = "text",
  disabled = false,
}: Props) => {
  return (
    <div
      className={`${
        disabled ? "bg-gray-200 text-gray-400" : ""
      } flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2 `}
    >
      {icon}
      <input
        disabled={disabled}
        type={type}
        className="w-full p-1 outline-0"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputTextFiled;
