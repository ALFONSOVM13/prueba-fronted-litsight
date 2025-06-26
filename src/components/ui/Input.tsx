"use client"

import { cn } from '@/utils/cn';
import React, { forwardRef } from 'react';
import Label from './Label';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      required = false,
      leftIcon,
      rightIcon,
      size = 'md',
      disabled,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2',
      lg: 'px-4 py-3 text-lg'
    };

    return (
      <div className="w-full">
        {label && (
          <Label required={required} className="mb-1">
            {label}
          </Label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full border rounded-lg text-dark',
              'placeholder:text-gray-400',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 hover:border-gray-400',
              disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              sizes[size],
              className
            )}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 