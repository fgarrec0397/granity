import { SxProps as MuiSxProps, Theme } from "@mui/material";
import { FlattenInterpolation, ThemeProps } from "@mui/styled-engine-sc";

export type ThemedFlattenInterpolation = FlattenInterpolation<ThemeProps<Theme>>;

export type SxProps<T extends Theme = Theme> = MuiSxProps<T>;
