"use client";
import "./styles.css";

import { HasChildren } from "@granity/helpers";
import { CssBaseline } from "@granity/ui";

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
