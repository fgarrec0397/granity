import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import {
    Queries,
    queries,
    render,
    renderHook,
    RenderHookOptions,
    RenderOptions,
} from "@testing-library/react";
import { FC, ReactElement, ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const TestAppProviders: FC<Props> = ({ children }) => {
    return <AppProvider>{children}</AppProvider>;
};

const appRender = (element: ReactElement, options: RenderOptions) =>
    render(element, { wrapper: TestAppProviders, ...options });

const appRenderHook = <Result, RenderProps>(hook: (initialProps: RenderProps) => Result) =>
    renderHook(hook, { wrapper: TestAppProviders });

export * from "@testing-library/react";

export { appRender, appRenderHook };
