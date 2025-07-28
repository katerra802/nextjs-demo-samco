import React from 'react';
import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false,
    error,
    className = '',
    ...props
}) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200';
    const errorClasses = error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300';
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';

    const classes = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;

    return (
        <div className="w-full">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                required={required}
                className={classes}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default Input;