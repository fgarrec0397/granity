"use client";

import { HasChildren } from "@granity/helpers";

type Props = HasChildren;

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
