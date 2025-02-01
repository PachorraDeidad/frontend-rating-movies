import React from "react";

interface InputFieldProps {
  label: string;
  inputName: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: JSX.Element;
  placeHolder?: string
}

const InputField = ({ label, inputName, type, value, onChange, error, icon, placeHolder }: InputFieldProps) => {
  return (
    <div className="space-y-1 group pl-3 pr-3">
      <label className="text-neutral-500 group-focus-within:text-neutral-300 duration-200 group-hover:text-neutral-300 pl-2">
        {label}
      </label>
      <div className="relative transition-transform duration-200 focus-within:scale-x-[1.01]">

        {icon && React.cloneElement(icon, {
          className: "absolute top-1/2 left-2 -translate-y-1/2 text-neutral-500 group-focus-within:text-neutral-300 duration-200 group-hover:text-neutral-300"
        })}

        <input
          className="w-full rounded pl-9 p-1 border-gray-700 border-2 outline-none bg-[#1C2124] text-neutral-300 group-focus-within:border-neutral-300 group-hover:border-neutral-300 duration-300 placeholder:text-gray-500"
          type={type}
          name={inputName}
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
        />
      </div>

      <p className="pl-3 text-red-500 text-xs group-first:mt-0.5 mb-0.5 h-[3px]">{error}</p>
    </div>
  );
};

export default InputField;
