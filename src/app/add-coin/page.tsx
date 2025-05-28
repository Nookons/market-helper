import React from 'react';
import CoinList from "@/components/coin-list/coin-list";
import {ICoinResponse} from "@/types/Coin";

async function getCoins(): Promise<ICoinResponse[]> {
    const res = await fetch('https://market-helper.vercel.app/api/coin-list', { cache: 'no-store' });
    const data = await res.json();
    return data.data;
}

const Page = async () => {
    const coins = await getCoins();

    return (
        <div className="pt-10 px-4">
            <CoinList coins={coins} />
        </div>
    );
};

export default Page;
