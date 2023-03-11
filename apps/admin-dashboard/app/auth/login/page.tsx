"use client";
import { GranityLogo } from "@granity-engine/Theme/components/Icons";
import {
    Alert,
    Box,
    BoxProps,
    LoadingButton,
    LoadingButtonProps,
    Paper,
    PaperProps,
    TextField,
    Typography,
    TypographyProps,
} from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react";

import backgroundImage from "../../../public/images/login-background.svg";

interface Props {
    searchParams?: { [key: string]: string | string[] | undefined };
}

type LoginPageStyles = {
    background?: BoxProps;
    formWrapper?: PaperProps;
    formHeader?: BoxProps;
    formHeaderText?: TypographyProps;
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
    formHeader: {
        sx: {
            display: "flex",
            alignItems: "center",
            marginBottom: pxToRem(30),
        },
    },
    formHeaderText: {
        fontSize: pxToRem(23),
        sx: {
            marginLeft: pxToRem(12),
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

const LoginPage = ({ searchParams }: Props) => {
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
                <Box {...styles.formHeader}>
                    <GranityLogo />
                    <Typography {...styles.formHeaderText}>Granity</Typography>
                </Box>
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
