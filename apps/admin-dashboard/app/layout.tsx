"use client";

import { HasChildren } from "@granity/helpers";
import { CssBaseline } from "@granity-ui/Components";

import Core from "../core/Core";

type Props = HasChildren;

export default function RootLayout({ children }: Props) {
    return (
        <Core>
            <CssBaseline />
            {children}
        </Core>
    );
}
