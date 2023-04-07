export const get = async <ReturnValue, RequestHeaders extends HeadersInit>(
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

    const response = rawResponse.json() as ReturnValue;

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
            data: response,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};

export const post = async <
    ReturnValue,
    Parameters extends BodyInit,
    RequestHeaders extends HeadersInit
>(
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

        const result: ReturnValue = await rawResponse.json();

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

export const deleteRequest = async <ReturnValue, Parameters, RequestHeaders extends HeadersInit>(
    url: string,
    parameters: Parameters,
    headers?: RequestHeaders
) => {
    const requestHeaders = headers ?? {
        Accept: "application/json",
        "Content-Type": "application/json",
    };

    console.log(parameters, "parameters");

    const rawResponse = await fetch(url, {
        method: "DELETE",
        headers: {
            ...requestHeaders,
        },
        body: parameters,
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        const result: ReturnValue = await rawResponse.json();

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
