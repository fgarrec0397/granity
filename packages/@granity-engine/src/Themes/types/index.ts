import { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type ThemedFlattenInterpolation = FlattenInterpolation<ThemeProps<DefaultTheme>>;

export * as colors from "./colors";
export * as common from "./common";
export * as focus from "./focus";
export * as formfield from "./formfield";
export * as modal from "./modal";
export * as typography from "./typography";
