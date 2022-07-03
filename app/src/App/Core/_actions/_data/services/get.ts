export default async () => {
    const data = await fetch("api/scene");
    return data;
};
