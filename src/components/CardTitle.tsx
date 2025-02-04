
import React from 'react';
import { CardTitle } from './CardTitle';

interface ClassCardProps {
  classIndex: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ classIndex }) => {
  return (
    <div className="card">
      <CardTitle className="text-xl font-semibold tracking-tight">
        Class {classIndex + 1}
      </CardTitle>
      {/* Other card content */}
    </div>
  );
};

export default ClassCard;