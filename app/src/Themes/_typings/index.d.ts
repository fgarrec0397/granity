export type BasicColor = {
    main: string;
    contrast: string;
    hover: string;
};

export type ThemeColors = {
    primary: BasicColor;
    secondary: BasicColor;
    common: {
        background: string;
        backgroundAlt: string;
        border: string;
        text: string;
        textDisabled: string;
    };
};

export type ThemeCommon = {
    borderRadius: {
        small: string;
        main: string;
        large: string;
        max: string;
    };
};

export type ThemeTypography = {
    fontFamilyURL: string;
    fontFamily: {
        main: string;
        alt?: string;
    };
    size: {
        tiny: string;
        smallest: string;
        smaller: string;
        small: string;
        main: string;
        large: string;
        larger: string;
        largest: string;
    };
    weight: {
        slim: string;
        lightest: string;
        lighter: string;
        light: string;
        main: string;
        medium: string;
        bold: string;
        bolder: string;
        black: string;
    };
};

declare module "styled-components" {
    export interface DefaultTheme {
        colors: ThemeColors;
        common: ThemeCommon;
        typography: ThemeTypography;
    }
}
