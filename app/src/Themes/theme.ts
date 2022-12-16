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
            active: "#007ACC",
            activeContrast: "#ffffff",
            background: "#323232",
            backgroundLight: "#3D3D3D",
            backgroundDark: "#292929",
            border: "#555555",
            text: "#ffffff",
            textDisabled: "",
        },
    },
    common: {
        borderRadius: {
            button: pxToRem(4),
            formField: pxToRem(4),
            panel: pxToRem(0),
            panelLarge: pxToRem(0),
            popover: pxToRem(8),
            max: "100%",
        },
        boxShadow: {
            main: `0 ${pxToRem(1)} ${pxToRem(3)} 0 rgb(0 0 0 / 0.25), 0 ${pxToRem(1)} ${pxToRem(
                2
            )} ${pxToRem(-1)} rgb(0 0 0 / 0.1)`,
        },
    },
    focus: {
        main: {
            borderColor: "#007ACC",
            borderWidth: pxToRem(1),
            borderOffset: pxToRem(1),
        },
        alt: {
            borderColor: "#007ACC",
            borderWidth: pxToRem(2),
            borderOffset: pxToRem(1),
        },
    },
    typography: {
        fontFamilyURL:
            "https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap",
        fontFamily: {
            main: "'DM Sans', sans-serif",
        },
        size: {
            tiniest: pxToRem(10),
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
