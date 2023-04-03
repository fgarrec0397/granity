export const get = async <RequestHeaders extends HeadersInit>(
    url: string,
    headers?: RequestHeaders
) => {
    const requestHeaders = headers ?? {};

    const rawResponse = await fetch(url, {
        method: "GET",
        headers: {
            ...requestHeaders,
        },
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
            data: rawResponse.json(),
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};

export const post = async <Parameters extends BodyInit, RequestHeaders extends HeadersInit>(
    url: string,
    parameters: Parameters,
    headers?: RequestHeaders
) => {
    const requestHeaders = headers ?? {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
            ...requestHeaders,
        },
        body: parameters,
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        const result = await rawResponse.json();

        return {
            success: true,
            result,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};
