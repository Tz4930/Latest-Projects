// components/InputField.tsx
import React, { ChangeEvent } from 'react';

interface InputFieldProps {
  className?: string;
  type: 'text' | 'email' | 'password'| 'url';
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> =({ className = '', ...props }) => {
  return (
    <input
      className={`border p-2 text-sm ${className}`}
      {...props}
    />
  );
};

export default InputField;
