import "styled-components";

export type BasicColor = {
    main: string;
    contrast: string;
};

export type ThemeColors = {
    primary: BasicColor;
    secondary: BasicColor;
    common: {
        background: string;
        backgroundAlt: string;
        border: string;
        text: string;
    };
};

export type ThemeButton = {
    test: string;
};

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        colors: ThemeColors;
        buttons: {
            primary: ThemeButton;
            secondary: ThemeButton;
        };
    }
}
