"use client";
// import Button from "@elements/Button";
// import TextBox from "@elements/TextBox";
import { Box, BoxProps, Button, TextField } from "@granity-ui/Components";
import { signIn } from "next-auth/react";
import { useRef } from "react";

interface IProps {
    searchParams?: { [key: string]: string | string[] | undefined };
}

type LoginPageStyles = {
    background?: BoxProps;
};

const styles: LoginPageStyles = {
    background: {
        sx: (theme) => ({
            background: theme.palette.background.gradient,
        }),
    },
};

const LoginPage = ({ searchParams }: IProps) => {
    const userName = useRef("");
    const pass = useRef("");

    const onSubmit = async () => {
        await signIn("username-login", {
            username: userName.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
        });
    };
    return (
        <Box {...styles.background}>
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
        </Box>
    );
};

export default LoginPage;
