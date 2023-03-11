"use client";
import { GranityLogo } from "@granity-engine/Theme/components/Icons";
import { Box, BoxProps, Typography, TypographyProps } from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";

type LogoStyles = {
    logoWrapper?: BoxProps;
    logoText?: TypographyProps;
};

const styles: LogoStyles = {
    logoWrapper: {
        sx: {
            display: "flex",
            alignItems: "center",
            marginBottom: pxToRem(30),
        },
    },
    logoText: {
        fontSize: pxToRem(23),
        sx: {
            marginLeft: pxToRem(12),
        },
    },
};

const Logo = () => {
    return (
        <Box {...styles.logoWrapper}>
            <GranityLogo />
            <Typography {...styles.logoText}>Granity</Typography>
        </Box>
    );
};

export default Logo;
