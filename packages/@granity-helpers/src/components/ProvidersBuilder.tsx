// TODO - fix these any types
const ProvidersBuilder: any = (providers: any) => {
    if (providers.length === 1) {
        return providers[0][0];
    }
    const [A, paramsA] = providers.shift();
    const [B, paramsB] = providers.shift();

    return ProvidersBuilder([
        [
            ({ children }: any) => (
                <A {...(paramsA || {})}>
                    <B {...(paramsB || {})}>{children}</B>
                </A>
            ),
        ],
        ...providers,
    ]);
};

export default ProvidersBuilder;
