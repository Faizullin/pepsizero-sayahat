import type {Metadata} from "next";
import {Inter, Noto_Sans, Oswald} from "next/font/google";
import localFont from 'next/font/local'

import React from "react";
import {ThemeProvider} from "next-themes";

import "./globals.css";

const futurapt = localFont({
    src: [
        {
            path: 'fonts/futurapt/FuturaPT-Demi.woff',
            weight: '600',
            style: 'normal',
        },
        {
            path: 'fonts/futurapt/FuturaPT-Bold.woff',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-futurapt',
})
const inter = Inter({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: '--font-inter',
});
const oswald = Oswald({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: '--font-oswald',
});
const arial = localFont({
    src: [
        {
            path: 'fonts/arial/ARIAL.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-arial',
})
const notosans = Noto_Sans({
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
    variable: '--font-notosans',
});


export const metadata: Metadata = {
    title: "Q Engineering",
    description: "Q Engineering website",
    keywords: ["Q Engineering", "qengineering"]
};

export default function RootLayout(
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="theme-color" content="#000000"/>
            {/*<link rel="manifest" href="./manifest.json"/>*/}
            <link rel="favicon" href="/favicon.ico"/>
            <title>Q Engineering</title>
        </head>
        <body
            className={`${futurapt.variable} ${inter.variable} ${arial.variable} ${notosans.variable} ${oswald.variable}`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>

        </body>
        </html>
    );
}
