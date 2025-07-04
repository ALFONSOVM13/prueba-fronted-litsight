import { cn } from '@/utils/cn';
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export default function Label({
  children,
  className,
  required = false,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        'block text-sm font-medium text-gray-700',
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
} 