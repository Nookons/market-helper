import { NextResponse } from 'next/server';

export async function GET() {
    console.log(process.env.COIN_MARKET_KEY!);
    const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY!,
        },
        next: { revalidate: 60 }, // Опционально: ISR кеширование
    });

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
