export default (value: string | boolean) => {
    if (typeof value === "string") {
        return value === "true";
    }

    return value;
};
