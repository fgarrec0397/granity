export const getFiles = async (path: string) => {
    const result = await fetch(`/server/files?pathToFolderToLoad=${path}`);
    return result.json();
};

export const saveFiles = async (formData: FormData) => {
    const rawResponse = await fetch("/server/files", {
        method: "POST",
        body: formData,
    });

    try {
        if (!rawResponse.ok) {
            throw new Error("An error occured.");
        }

        return {
            success: true,
        };
    } catch (error: any) {
        return {
            success: false,
            errorMessage: error,
        };
    }
};
