'use client'
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className={`pt-10`}>
            Coin-id
            {id}
        </div>
    );
};

export default Page;