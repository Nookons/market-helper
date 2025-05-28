'use client'
import React from 'react';
import {ICoinResponse} from '@/types/Coin';
import { useRouter } from 'next/navigation';

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

    return (
        <div className="max-w-4xl mx-auto mt-10 p-2 rounded-lg shadow-md">
            <ul className="w-full">
                {coins.map((coin) => (
                    <li
                        onClick={() => router.push(`/coins/coin-id?id=${coin.id}`)}
                        key={coin.id}
                        className="flex cursor-pointer w-full justify-between items-center mb-4" // добавлен items-center для вертикального центрирования
                    >
                        <div>
                            <p className="sm:text-lg text-x font-semibold dark:text-gray-200 text-gray-900">
                                {coin.name} <span className="sm:text-sm text-xs text-neutral-600">/ {coin.symbol}</span>
                            </p>
                            <p className="sm:text-sm text-xs font-semibold text-neutral-600">
                                {formatNumber(coin.quote.USD.volume_24h)} USDT
                            </p>
                        </div>

                        <div
                            className="flex items-center gap-6"> {/* меняем grid на flex, чтобы лучше центрировалось */}
                            <div className="text-right">
                                <p className="font-semibold text-x sm:text-lg">
                                    ${coin.quote.USD.price.toFixed(2)}
                                </p>
                                <p className={`text-xs text-neutral-600 font-semibold`}>
                                    {coin.quote.USD.price.toLocaleString()} USD
                                </p>
                            </div>
                            <div>
                                {coin.quote.USD.percent_change_24h > 0 ? (
                                    <span className="text-xs sm:text-lg bg-green-500 rounded px-3 py-1 text-white text-center block">
                                        +{coin.quote.USD.percent_change_24h.toFixed(2)}%
                                      </span>
                                ) : (
                                    <span className="text-xs sm:text-lg bg-red-500 rounded px-3 py-1 text-white text-center block">
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
