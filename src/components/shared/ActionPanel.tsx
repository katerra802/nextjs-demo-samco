// src/components/ActionPanel.tsx
'use client';

import React from 'react';
import Button from '@/components/common/Button';
import { ButtonProps } from '../../types'; // Import ButtonProps để lấy các variant

// === SỬA ĐỔI NHỎ: Cho phép Action sử dụng tất cả các variant của Button ===
interface Action {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: ButtonProps['variant']; // Lấy các kiểu variant trực tiếp từ ButtonProps
}

interface ActionPanelProps {
  actions: Action[];
  className?: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ actions, className = '' }) => {
  return (
    <div className={`mt-8 flex flex-col sm:flex-row justify-center items-center gap-4 ${className}`}>
      {actions.map((action) => (
        // Bây giờ việc truyền href là hoàn toàn hợp lệ
        <Button
          key={action.text}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
        >
          {action.text}
        </Button>
      ))}
    </div>
  );
};

export default ActionPanel;