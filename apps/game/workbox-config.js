module.exports = {
    globDirectory: "public/",
    globPatterns: ["**/*.{glb,svg,ico,png,json}"],
    swDest: "public/sw.js",
    ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
};
