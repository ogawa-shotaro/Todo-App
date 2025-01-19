import type { FC, ChangeEvent } from "react";

interface TextFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label: string;
  required?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  label,
  required,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="whitespace-pre-wrap w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-transparent"
      />
    </div>
  );
};
