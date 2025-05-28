'use client'
import React, {useEffect, useState} from 'react';
import {ICoinResponse} from '@/types/Coin';
import { useRouter } from 'next/navigation';
import MyInput from "@/UI/MyInput/MyInput";
import MySkeleton from "@/UI/MySkeleton/MySkeleton";

function formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
        return (value / 1_000_000_000).toFixed(2) + 'B';
    } else if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(2) + 'M';
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(2) + 'K';
    } else {
        return value.toString();
    }
}


const CoinList = ({coins}: { coins: ICoinResponse[] }) => {
    const router = useRouter()

    const [search_value, setSearch_value] = useState<string>("")
    const [filtered_data, setFiltered_data] = useState<ICoinResponse[] | null>(null)

    const onCoinHandler = (coin: ICoinResponse) => {
        localStorage.setItem('current_coin', JSON.stringify(coin));
        router.push(`/add-coin/${coin.name}?id=${coin.id}`)
    }

    useEffect(() => {
        if (search_value) {
            const result = coins.filter(item => item.name.toLowerCase().includes(search_value.toLowerCase()))
            setFiltered_data(result);
        } else {
            setFiltered_data(coins);
        }
    }, [search_value, coins])

    if (!filtered_data) {
        return (
            <div className={`mt-15 flex flex-col gap-4`}>
                <MySkeleton height={50} isFullWidth={true} />
                <MySkeleton height={250} isFullWidth={true} />
                <MySkeleton height={50} isFullWidth={true} />
                <MySkeleton height={100} isFullWidth={true} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-2 pt-10 pb-20 rounded-lg font-[family-name:var(--font-geist-sans)]">
            <MyInput
                value={search_value}
                onChange={(e) => setSearch_value(e.target.value)}
                className={`mb-4`}
                label={`Search coin`}
                placeholder={`Bitcoin`}
            />
            <ul className="w-full">
                {filtered_data.map((coin) => (
                    <li
                        onClick={() => onCoinHandler(coin)}
                        key={coin.id}
                        className="flex cursor-pointer w-full justify-between items-center mb-6"
                    >
                        <div>
                            <p className="sm:text-lg text-sm font-semibold dark:text-gray-200 text-gray-900">
                                {coin.name} <span className="sm:text-lg text-xs text-neutral-600">/ {coin.symbol}</span>
                            </p>
                            <p className="sm:text-sm text-xs font-semibold text-neutral-600">
                                {formatNumber(coin.quote.USD.volume_24h)} USDT
                            </p>
                        </div>

                        <div
                            className="flex items-center gap-6"> {/* меняем grid на flex, чтобы лучше центрировалось */}
                            <div className="text-right">
                                <p className="font-semibold text-sm sm:text-lg">
                                    $ {coin.quote.USD.price.toFixed(2)}
                                </p>
                                <p className={`text-xs text-neutral-600 font-semibold`}>
                                    {coin.quote.USD.price.toLocaleString()} USD
                                </p>
                            </div>
                            <div>
                                {coin.quote.USD.percent_change_24h > 0 ? (
                                    <span className="text-sm sm:text-lg bg-green-500 rounded px-3 py-1 text-white text-center block">
                                        +{coin.quote.USD.percent_change_24h.toFixed(2)}%
                                      </span>
                                ) : (
                                    <span className="text-sm sm:text-lg bg-red-500 rounded px-3 py-1 text-white text-center block">
                                        {coin.quote.USD.percent_change_24h.toFixed(2)}%
                                      </span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {coins.length === 0 && (
                <p className="text-center text-gray-500 mt-6">Монеты не найдены</p>
            )}
        </div>
    );
};

export default CoinList;
