import { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

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
