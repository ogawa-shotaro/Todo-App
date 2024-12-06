import type { FC, ChangeEvent } from "react";

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
}

export const InputField: FC<InputFieldProps> = ({
  id,
  type,
  name,
  value,
  onChange,
  placeholder = "",
  label,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        id=""
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};
