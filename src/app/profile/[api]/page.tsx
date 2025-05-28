'use client'
import React, {useState} from 'react';
import MyInput from "@/UI/MyInput/MyInput";
import MyButton from "@/UI/MyButton/MyButton";
import {decrypt, encrypt} from '@/utils/encrypt_api';

const Page = () => {

    const [binance_value, setBinance_value] = useState<string>("")

    const onSave = () => {
        if (binance_value.length) {
            const encrypt_value = encrypt(binance_value);
            console.log(encrypt_value);

            const decrypt_value = decrypt(encrypt_value);
            console.log(decrypt_value);
        }
    }

    return (
        <div className={`pt-20 px-4 font-[family-name:var(--font-geist-sans)]`}>
            <h4>API Setting page</h4>
            <div className={`mt-4 flex flex-col gap-4`}>
                <MyInput
                    value={binance_value}
                    onChange={(e) => setBinance_value(e.target.value)}
                    type={`password`}
                    label={`Binance API`}
                    placeholder={`rH1x+Be8vWX9OnTjPvDiDUToVLb4ZHzA0FquUm4HLdA=`}
                />
                <MyInput
                    value={binance_value}
                    onChange={(e) => setBinance_value(e.target.value)}
                    type={`password`}
                    label={`ByBit API`}
                    placeholder={`rH1x+Be8vWX9OnTjPvDiDUToVLb4ZHzA0FquUm4HLdA=`}
                />
                <MyInput
                    value={binance_value}
                    onChange={(e) => setBinance_value(e.target.value)}
                    type={`password`}
                    label={`Telegram Wallet API`}
                    placeholder={`rH1x+Be8vWX9OnTjPvDiDUToVLb4ZHzA0FquUm4HLdA=`}
                />
            </div>
            <MyButton className={`mt-4`} onClick={onSave} >Save</MyButton>
        </div>
    );
};

export default Page;