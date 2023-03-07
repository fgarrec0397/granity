"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const HomePage = () => {
    return (
        <h1 className="flex justify-center items-center p-5 text-green-500 text-lg font-bold">
            This Is The Home Page! Everyone can see it.
        </h1>
    );
};

export default HomePage;
