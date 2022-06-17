const path = require(`path`);

const basePath = `./src`;

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, `${basePath}/App/`),
      "@common": path.resolve(__dirname, `${basePath}/App/Common/`),
      "@core": path.resolve(__dirname, `${basePath}/App/Core/`),
      "@editor": path.resolve(__dirname, `${basePath}/App/Editor/`),
      "@scene": path.resolve(__dirname, `${basePath}/App/Scene/`),
      "@widgets": path.resolve(__dirname, `${basePath}/App/Widgets/`),
      "@features": path.resolve(__dirname, `${basePath}/Features/`),
    },
  },
};