import { EngineConfig } from "@engine/api";
import GranityEngineProvider from "@engine/Providers";
import { HasChildren } from "@granity/helpers";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";

type Props = HasChildren;

const config: EngineConfig = {
    widgetsModules: [],
};

export const TestAppProviders: FC<Props> = ({ children }) => {
    return <GranityEngineProvider config={config}>{children}</GranityEngineProvider>;
};

const appRender = (element: ReactElement, options: RenderOptions) =>
    render(element, { wrapper: TestAppProviders, ...options });

const appRenderHook = <Result, RenderProps>(hook: (initialProps: RenderProps) => Result) =>
    renderHook(hook, { wrapper: TestAppProviders });

export * from "@testing-library/react";

export { appRender, appRenderHook };
