"use client";
import { Button, TextField } from "@granity/ui";
import { useRef } from "react";

interface IProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

type CreateAccountParameters = {
    username: string;
    password: string;
};

const createAccount = async (params: CreateAccountParameters) => {
    await fetch("/server/auth/createUser", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });
};

const CreateAccountPage = ({ searchParams }: IProps) => {
    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        await createAccount({
            username: userName.current,
            password: pass.current,
        });
    };

    return (
        <div
            className={
                "flex flex-col justify-center items-center  h-screen bg-gradient-to-br gap-1 from-cyan-300 to-sky-600"
            }
        >
            {searchParams?.message && (
                <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
                    {searchParams?.message}
                </p>
            )}
            <div className="px-7 py-4 shadow bg-white rounded-md flex flex-col gap-2">
                <TextField
                    label="User Name"
                    onChange={(e) => (userName.current = e.target.value)}
                />
                <TextField
                    label="Password"
                    type={"password"}
                    onChange={(e) => (pass.current = e.target.value)}
                />
                <Button onClick={onSubmit}>Login</Button>
            </div>
        </div>
    );
};

export default CreateAccountPage;
