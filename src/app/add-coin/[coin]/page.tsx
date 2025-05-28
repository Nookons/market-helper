'use client'
import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import {ICoinResponse} from "@/types/Coin";
import MyButton from "@/UI/MyButton/MyButton";
import Link from "next/link";
import MyInput from "@/UI/MyInput/MyInput";
import MySelect, {ISelectOption} from "@/UI/MySelect/MySelect";
import exchanges_data from "@/json/exchange.json"
import MySkeleton from "@/UI/MySkeleton/MySkeleton";
import {IExchangeJson} from "@/types/Exchange";
import dayjs from "dayjs";

const Page = () => {
    const router = useRouter();

    const [coin_data, setCoin_data] = useState<ICoinResponse | null>(null)
    const [error, setError] = useState<string>("")

    const [price_value, setPrice_value] = useState<string>("0")
    const [count_value, setCount_value] = useState<string>("1")
    const [select_value, setSelect_value] = useState<string>("")

    const [options, setOptions] = useState<ISelectOption[] | null>(null);

    const [exchange_data, setExchange_data] = useState<IExchangeJson | null>(null)

    useEffect(() => {
        if (exchanges_data) {
            const parsed = exchanges_data.exchanges.map(el => ({
                label: el.name,
                value: el.name
            }));
            setOptions(parsed);
        } else {
            setOptions(null);
        }
    }, [exchanges_data]);

    useEffect(() => {
        const data = localStorage.getItem('current_coin');

        if (data) {
            const parsed: ICoinResponse = JSON.parse(data);
            setCoin_data(parsed);
        } else {
            setError("Coin not found please try again");
        }

    }, [localStorage]);

    useEffect(() => {
        if (coin_data) {
            setPrice_value(coin_data.quote.USD.price.toFixed(4))
            console.log(coin_data);
        }
    }, [coin_data]);

    useEffect(() => {
        if (select_value) {
            const find = exchanges_data.exchanges.find(item => item.name === select_value)
            if (find) {
                setExchange_data(find)
            }
        }
    }, [select_value]);

    const amount = `${Number(price_value) * Number(count_value)}`

    if (error.length) {
        return (
            <div className={`mt-20 mx-4 p-4 bg-red-500 text-white rounded-2xl font-[family-name:var(--font-geist-sans)]`}>
                <div className={`flex items-center gap-2 font-semibold text-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                    </svg>
                    <h4>Error</h4>
                </div>
                <article>{error}</article>
                <MyButton onClick={() => router.back()} className={`mt-4`}>
                    <div className={`flex justify-center items-center gap-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"/>
                        </svg>
                        <span className={`text-lg`}>
                            Back
                        </span>
                    </div>
                </MyButton>
            </div>
        )
    }

    if (!coin_data) {
        return (
            <div className={`mt-20 p-4 flex flex-col gap-4`}>
                <MySkeleton height={250} isFullWidth={true} />
                <MySkeleton height={50} isFullWidth={true} />
                <MySkeleton height={100} isFullWidth={true} />
            </div>
        )
    }

    const test = 0.012341252515
    const text_usdt = test * coin_data.quote.USD.price

    return (
        <div className={`pt-20 pb-20 container m-auto font-[family-name:var(--font-geist-sans)]`}>
            <div className={`p-4 flex flex-col gap-4`}>
                <div className={`flex justify-between items-center gap-2`}>
                    <article className={`text-xl`}>{coin_data.name} <span className={`text-xs text-neutral-500`}>/ {coin_data.symbol}</span></article>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                    </svg>
                </div>
                <div>
                    <div className={`flex justify-between items-center gap-2`}>
                        <Link className={`border-b border-dotted text-neutral-500 text-x`} href={`#`}>Available</Link>
                        <div className={`flex justify-center items-center gap-2`}>
                            <div className={`flex flex-col justify-end items-end`}>
                                <article>{test.toFixed(6)}</article>
                                <article className={`text-xs text-neutral-500`}>{text_usdt.toFixed(6)} USDT</article>
                            </div>
                            <svg color={`orange`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-2`}>
                    <MyInput value={price_value} onChange={(e) => setPrice_value(e.target.value)} label={`Price USDT`} />
                    <MyInput value={count_value} onChange={(e) => setCount_value(e.target.value)} label={`Quantity`} />
                    {options
                        ? <MySelect label={`Exchange platform`} value={select_value} onChange={setSelect_value} options={options} />
                        : <MySkeleton height={50} isFullWidth={true} />
                    }
                    {exchange_data &&
                        <div className={`flex flex-col gap-2 mt-2`}>
                            <h4 className={`text-lg font-semibold`}>{exchange_data.name} <span className={`text-xs text-neutral-500`}>/ {exchange_data.founded}</span> </h4>
                            <article className={`text-sx text-neutral-500`}>Fiat: {exchange_data.fiat_supported.join(', ')}</article>
                            <article className={`text-sx text-neutral-500`}>Features: {exchange_data.features.join(', ')}</article>
                        </div>
                    }
                </div>
                <div>
                    <article className={`text-xs text-neutral-500`}>Full Amount is: {amount} $</article>
                    <MyButton className={`mt-2`}>
                        <div className={`flex items-center justify-center gap-2`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"/>
                            </svg>
                            <span>Add</span>
                        </div>
                    </MyButton>
                </div>
                <div className={`mt-20 border-t pt-4 border-dotted border-neutral-500`}>
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex text-orange-500 justify-start items-center gap-2`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                            </svg>
                            <span className={`text-xl `}>{coin_data.cmc_rank}</span>
                        </div>
                        <div className={`flex flex-col items-end`}>
                            <article>{dayjs(coin_data.date_added).format("dddd-MMMM / DD-MM-YYYY")}</article>
                            <article className={`text-neutral-500`}>dd-mm-yyyy</article>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col gap-4`}>
                    <div>
                        <article>Changes:</article>
                        <div className={`flex gap-2 text-neutral-500 mt-2 flex-wrap`}>
                            <article>1 Hour <span
                                className={`${coin_data.quote.USD.percent_change_1h > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_1h.toFixed(2)} %</span>
                            </article>
                            <article>24 Hours <span
                                className={`${coin_data.quote.USD.percent_change_24h > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_24h.toFixed(2)} %</span>
                            </article>
                            <article>7 Days <span
                                className={`${coin_data.quote.USD.percent_change_7d > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_7d.toFixed(2)} %</span>
                            </article>
                            <article>30 Days <span
                                className={`${coin_data.quote.USD.percent_change_30d > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_30d.toFixed(2)} %</span>
                            </article>
                            <article>60 Days <span
                                className={`${coin_data.quote.USD.percent_change_60d > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_60d.toFixed(2)} %</span>
                            </article>
                            <article>90 Days <span
                                className={`${coin_data.quote.USD.percent_change_90d > 0 ? "text-green-500" : "text-red-500"}`}>{coin_data.quote.USD.percent_change_90d.toFixed(2)} %</span>
                            </article>
                        </div>
                    </div>
                    <article>Tags: <span className={`text-neutral-500`}>#{coin_data.tags.join(" #")}</span></article>
                </div>
            </div>
        </div>
    );
};

export default Page;