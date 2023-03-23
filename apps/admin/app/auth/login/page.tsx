"use client";
import {
    Alert,
    Box,
    BoxProps,
    LoadingButton,
    LoadingButtonProps,
    Paper,
    PaperProps,
    pxToRem,
    TextField,
} from "@granity/ui";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

import Logo from "../../../core/components/Logo";
import backgroundImage from "../../../public/static/login-background.svg";

type LoginPageStyles = {
    background?: BoxProps;
    formWrapper?: PaperProps;
    submitButton?: LoadingButtonProps;
};

const styles: LoginPageStyles = {
    background: {
        sx: (theme) => ({
            height: "100vh",
            backgroundImage: `url(${backgroundImage.src}), ${theme.palette.background.gradient}`,
            backgroundSize: "cover",
            backgroundPosition: "center",
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
        variant: "contained",
        sx: {
            marginTop: pxToRem(30),
        },
    },
};

const LoginPage = () => {
    const userName = useRef("");
    const password = useRef("");
    const router = useRouter();
    const [isLoading, setSetIsLoading] = useState(false);
    const [hasError, setSetHasError] = useState(false);

    const onSubmit = async () => {
        setSetIsLoading(true);
        const signinResult = await signIn("username-login", {
            username: userName.current,
            password: password.current,
            redirect: false,
            callbackUrl: "/",
        });

        if (!signinResult) {
            setSetIsLoading(false);
            return;
        }

        if (!signinResult.ok) {
            setSetHasError(true);
        }

        if (signinResult.ok) {
            router.push(signinResult.url || "/");
        }

        setSetIsLoading(false);
    };
    return (
        <Box {...styles.background}>
            <Paper {...styles.formWrapper}>
                <Logo />
                {hasError && <Alert severity="error">Invalid Credentials</Alert>}
                <TextField
                    label="User Name"
                    onChange={(e) => (userName.current = e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Password"
                    type={"password"}
                    onChange={(e) => (password.current = e.target.value)}
                    fullWidth
                />
                <LoadingButton onClick={onSubmit} loading={isLoading} {...styles.submitButton}>
                    Login
                </LoadingButton>
            </Paper>
        </Box>
    );
};

export default LoginPage;
