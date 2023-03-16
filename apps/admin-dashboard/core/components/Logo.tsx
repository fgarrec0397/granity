"use client";
import { GranityLogo } from "@granity/engine/Theme/components/Icons";
import { Box, BoxProps, Typography, TypographyProps } from "@granity-ui/Components";
import { pxToRem } from "@granity-ui/Theme";
import useMergeStyles from "@granity-ui/Theme/hooks/useMergeStyles";
import { FC } from "react";

type Props = {
    stylesOverrides?: LogoStyles;
};

export type LogoStyles = {
    logoWrapper?: BoxProps;
    logoText?: TypographyProps;
};

const logoStyles: LogoStyles = {
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

const Logo: FC<Props> = ({ stylesOverrides }) => {
    const styles = useMergeStyles(logoStyles, stylesOverrides);

    return (
        <Box {...styles.logoWrapper}>
            <GranityLogo />
            <Typography {...styles.logoText}>Granity</Typography>
        </Box>
    );
};

export default Logo;
