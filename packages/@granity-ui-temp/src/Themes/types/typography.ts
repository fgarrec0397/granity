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
