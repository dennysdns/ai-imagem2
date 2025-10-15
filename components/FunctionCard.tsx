
import React from 'react';

interface FunctionCardProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FunctionCard: React.FC<FunctionCardProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 text-center text-sm font-semibold rounded-lg border-2 transition-all duration-200 ${
        isActive
          ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20'
          : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-purple-500 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
};

export default FunctionCard;
