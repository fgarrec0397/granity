import { DefaultTheme } from "styled-components";

import pxToRem from "./utils/pxToRem";

const theme: DefaultTheme = {
    colors: {
        primary: {
            main: "#9D00FF",
            contrast: "#FFFFFF",
            hover: "#BE57FF",
        },
        secondary: {
            main: "",
            contrast: "",
            hover: "",
        },
        common: {
            background: "",
            backgroundAlt: "",
            border: "",
            text: "",
            textDisabled: "",
        },
    },
    common: {
        borderRadius: {
            small: pxToRem(4),
            main: pxToRem(8),
            large: pxToRem(12),
            max: "100%",
        },
    },
    typography: {
        fontFamilyURL:
            "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
        fontFamily: {
            main: "'DM Sans', sans-serif",
        },
        size: {
            tiny: pxToRem(12),
            smallest: pxToRem(13),
            smaller: pxToRem(14),
            small: pxToRem(15),
            main: pxToRem(16),
            large: pxToRem(18),
            larger: pxToRem(20),
            largest: pxToRem(22),
        },
        weight: {
            slim: "100",
            lightest: "200",
            lighter: "300",
            light: "400",
            main: "500",
            medium: "600",
            bold: "700",
            bolder: "800",
            black: "900",
        },
    },
};

export default theme;
