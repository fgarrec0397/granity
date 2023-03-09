"use client";

import { HasChildren } from "@granity/helpers";

import Core from "../core/Core";

type Props = HasChildren;

export default function RootLayout({ children }: Props) {
    return <Core>{children}</Core>;
}
