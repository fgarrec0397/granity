import { GranityEngineProvider } from "@granity/engine";
import { HasChildren, ProvidersBuilder, QueryClient, QueryClientProvider } from "@granity/helpers";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";

import { granityConfig } from "./../config/granity";
import CoreLayout from "./components/CoreLayout";

type Props = HasChildren;

const queryClient = new QueryClient();

const Core: FC<Props> = ({ children }) => {
    const Providers = ProvidersBuilder([
        [SessionProvider],
        [QueryClientProvider, { client: queryClient }],
        [GranityEngineProvider, { config: granityConfig }],
    ]);

    return (
        <CoreLayout>
            <Providers>{children}</Providers>
        </CoreLayout>
    );
};

export default Core;
