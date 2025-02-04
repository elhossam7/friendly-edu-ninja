
import React from 'react';

interface FormLabelProps {
  children: React.ReactNode;
  className?: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ children, className }) => {
  return (
    <label className={`font-medium text-sm ${className}`}>
      {children}
    </label>
  );
};

export default FormLabel;