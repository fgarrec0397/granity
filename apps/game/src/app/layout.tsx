"use client";

import { HasChildren } from "@granity/helpers";
import { CssBaseline } from "@granity/ui";

type Props = HasChildren;

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <CssBaseline />
                {children}
            </body>
        </html>
    );
}
