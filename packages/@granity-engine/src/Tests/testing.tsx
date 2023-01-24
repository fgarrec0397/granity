import { HasChildren } from "@granity/helpers";
import AppProvider from "@granity-engine/App/Core/_actions/_data/providers/AppProvider";
import { render, renderHook, RenderOptions } from "@testing-library/react";
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
