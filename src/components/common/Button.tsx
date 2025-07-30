// src/components/common/Button.tsx

import React from 'react';
import Link from 'next/link'; // << THÊM IMPORT LINK
import { ButtonProps } from '../../types'; // Bạn vẫn import từ đây

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    className = '',
    href, // << NHẬN PROP HREF
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400', // Đổi màu secondary cho dễ nhìn hơn
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
        ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    // Khi loading, nút cũng bị vô hiệu hóa
    const isDisabled = disabled || loading;
    const disabledClasses = isDisabled ? 'opacity-50 cursor-not-allowed' : '';

    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

    const content = (
        <>
            {loading && (
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            {children}
        </>
    );

    // === THAY ĐỔI LOGIC CHÍNH Ở ĐÂY ===
    // Nếu có href, render ra một component <Link>
    if (href && !isDisabled) {
        return (
            <Link href={href} className={classes} {...props}>
                {content}
            </Link>
        );
    }
    
    // Nếu có href nhưng bị disabled, render ra thẻ `<a>` không có href
    if (href && isDisabled) {
        return (
            <a className={classes} aria-disabled="true" {...props}>
                {content}
            </a>
        )
    }

    // Mặc định, render ra một thẻ <button>
    return (
        <button
            type={type}
            className={classes}
            disabled={isDisabled}
            onClick={onClick}
            {...props}
        >
            {content}
        </button>
    );
};

export default Button;