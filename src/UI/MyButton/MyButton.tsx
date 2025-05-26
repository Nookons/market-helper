import React from 'react';
import Link from "next/link";

const MyButton = ({children}: {children: React.ReactNode}) => {
    return (
        <Link href={`#`}>
            {children}
        </Link>
    );
};

export default MyButton;