"use client";
// import Button from "@elements/Button";
// import TextBox from "@elements/TextBox";
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Paper,
    PaperProps,
    TextField,
} from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import { signIn } from "next-auth/react";
import { useRef } from "react";

import backgroundImage from "../../../public/images/login-background.svg";

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined };
}

type LoginPageStyles = {
    background?: BoxProps;
    formWrapper?: PaperProps;
    submitButton?: ButtonProps;
};

const styles: LoginPageStyles = {
    background: {
        sx: (theme) => ({
            height: "100vh",
            backgroundImage: `url(${backgroundImage.src}), ${theme.palette.background.gradient}`,
            backgroundSize: "cover",
        }),
    },
    formWrapper: {
        sx: {
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: pxToRem(350),
            padding: pxToRem(60, 50),
        },
    },
    submitButton: {
        fullWidth: false,
        sx: {
            marginTop: pxToRem(30),
        },
    },
};

const LoginPage = ({ searchParams }: Props) => {
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
            <Paper {...styles.formWrapper}>
                {searchParams?.message && (
                    <p className="text-red-700 bg-red-100 py-2 px-5 rounded-md">
                        {searchParams?.message}
                    </p>
                )}
                <TextField
                    label="User Name"
                    onChange={(e) => (userName.current = e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type={"password"}
                    onChange={(e) => (pass.current = e.target.value)}
                    fullWidth
                />
                <Button onClick={onSubmit} {...styles.submitButton}>
                    Login
                </Button>
            </Paper>
        </Box>
    );
};

export default LoginPage;
