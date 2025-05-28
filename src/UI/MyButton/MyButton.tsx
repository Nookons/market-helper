'use client';

import React from 'react';
import Link from 'next/link';

interface MyButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({
                                               children,
                                               href,
                                               onClick,
                                               className = '',
                                               disabled = false,
                                           }) => {
    const baseStyles =
        'inline-block cursor-pointer w-full font-[family-name:var(--font-geist-sans)] text-center px-4 py-2 rounded-2xl text-white bg-orange-400 hover:bg-orange-500 transition duration-200 disabled:opacity-50 disabled:pointer-events-none';

    const combinedClassName = `${baseStyles} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            className={combinedClassName}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default MyButton;
