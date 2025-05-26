'use client'
import React from 'react';
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const session = useSession();

    if (session.status === "loading") {
        return <article>Loading...</article>
    }

    return (
        <header className="fixed top-0 w-full backdrop-blur  z-50 font-[family-name:var(--font-geist-sans)]">
            <div className="mx-auto px-4 py-3 grid grid-cols-2 items-center">
                {/* Left Side (Logo and Title) */}
                <div className="flex items-center gap-3">
                    <Image width={40} height={40} alt="Crypto Helper Logo" src="/bitcoin-logo.svg" />
                    <h1 className="text-lg font-semibold">Crypto Helper</h1>
                </div>

                {/* Right Side (Auth Buttons) */}
                <div className="flex justify-end items-center gap-5">
                    {session.data ? (
                        <>
                            <Link
                                className="hover:text-yellow-400 transition-colors"
                                href="/profile"
                                aria-label="Go to profile"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                </svg>
                            </Link>

                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hover:text-yellow-400 transition-colors"
                                aria-label="Sign out"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" strokeWidth={1.5}
                                     stroke="currentColor" className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"/>
                                </svg>
                            </button>
                        </>
                    ) : (
                        <Link
                            className="hover:text-yellow-400 transition-colors"
                            href="/api/auth/signin"
                            aria-label="Sign in"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"/>
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
