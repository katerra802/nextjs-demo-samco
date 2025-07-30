// src/components/InfoGrid.tsx
'use client';

import React from 'react';

interface InfoItem {
  label: string;
  value: string;
}

interface InfoGridProps {
  items: InfoItem[];
  className?: string;
}

const InfoGrid: React.FC<InfoGridProps> = ({ items, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 text-center ${className}`}>
      {items.map((item) => (
        <div key={item.label}>
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;