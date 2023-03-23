"use client";
import { Box, BoxProps, GranityLogoWithText, pxToRem, useMergeStyles } from "@granity/ui";
import { FC } from "react";

type Props = {
    stylesOverrides?: LogoStyles;
};

export type LogoStyles = {
    logoWrapper?: BoxProps;
};

const logoStyles: LogoStyles = {
    logoWrapper: {
        sx: {
            marginBottom: pxToRem(30),
        },
    },
};

const Logo: FC<Props> = ({ stylesOverrides }) => {
    const styles = useMergeStyles(logoStyles, stylesOverrides);

    return (
        <Box {...styles.logoWrapper}>
            <GranityLogoWithText />
        </Box>
    );
};

export default Logo;
