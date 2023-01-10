import AppProvider from "@app/Core/_actions/_data/providers/AppProvider";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { HasChildren } from "helpers-granity";
import { FC, ReactElement } from "react";

type Props = HasChildren;

export const TestAppProviders: FC<Props> = ({ children }) => {
    return <AppProvider>{children}</AppProvider>;
};

const appRender = (element: ReactElement, options: RenderOptions) =>
    render(element, { wrapper: TestAppProviders, ...options });

const appRenderHook = <Result, RenderProps>(hook: (initialProps: RenderProps) => Result) =>
    renderHook(hook, { wrapper: TestAppProviders });

export * from "@testing-library/react";

export { appRender, appRenderHook };
