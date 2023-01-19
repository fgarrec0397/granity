export const get = async (url: string) => {
    return fetch(url);
};

export const post = async <PostData>(url: string, data: PostData) => {
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};
