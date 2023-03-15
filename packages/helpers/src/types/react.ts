import { ReactNode } from "react";

/**
 * A React component with children prop
 */
export type HasChildren = {
    children: ReactNode | ReactNode[];
};

/**
 * A React component with callable children prop
 */
export type HasCallableChildren<P> = {
    children: (param: P) => ReactNode | ReactNode[];
};
