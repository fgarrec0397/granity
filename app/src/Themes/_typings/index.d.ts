import { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type BasicColor = {
    main: string;
    contrast: string;
    hover: string;
};

export type BasicFocus = {
    borderColor: string;
    borderWidth: string;
    borderOffset: string;
};

export type ThemedColors = {
    primary: BasicColor;
    secondary: BasicColor;
    common: {
        active: string;
        activeContrast: string;
        background: string;
        backgroundLight: string;
        backgroundDark: string;
        border: string;
        overlay: string;
        text: string;
        textDisabled: string;
    };
    danger: BasicColor;
    info: BasicColor;
    success: BasicColor;
    warning: BasicColor;
};

export type ThemedCommon = {
    blur: {
        light: string;
        main: string;
        heavy: string;
    };
    borderRadius: {
        button: string;
        formField: string;
        panel: string;
        modal: string;
        popover: string;
        max: string;
    };
    boxShadow: {
        main: string;
    };
    canvas: {
        background: string;
    };
    zIndex: {
        modal: number;
        main: number;
    };
};

export type ThemedFocus = {
    main: BasicFocus;
    alt: BasicFocus;
};

export type ThemedFormField = {
    placeholder: string;
};

export type ThemedModal = {
    spacing: {
        small: string;
        medium: string;
        large: string;
    };
    size: {
        small: string;
        medium: string;
        large: string;
    };
};

export type ThemedTypography = {
    fontFamilyURL: string;
    fontFamily: {
        main: string;
        alt?: string;
    };
    size: {
        tiniest: string;
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

export type ThemedFlattenInterpolation = FlattenInterpolation<ThemeProps<DefaultTheme>>;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: ThemedColors;
        common: ThemedCommon;
        focus: ThemedFocus;
        formField?: ThemedFormField;
        modal: ThemedModal;
        typography: ThemedTypography;
    }
}
