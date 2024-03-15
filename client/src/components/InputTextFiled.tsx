import React, { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  value: string | undefined;
  setValue: (val: string) => void;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
};

const InputTextFiled = ({
  icon,
  setValue,
  value,
  placeholder,
  type = "text",
}: Props) => {
  return (
    <div className="flex items-center rounded-lg w-full border-2  px-2 py-1 gap-2">
      {icon}
      <input
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
