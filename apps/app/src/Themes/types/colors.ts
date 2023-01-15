export type BasicColor = {
    main: string;
    contrast: string;
    hover: string;
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
