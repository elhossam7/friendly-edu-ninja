
import React from 'react';
import { Button } from '@chakra-ui/react';

interface CustomButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children }) => {
  return (
    <Button 
      className="w-full justify-start text-base font-medium"
      variant="outline"
    >
      {children}
    </Button>
  );
};

export default CustomButton;