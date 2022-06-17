const path = require(`path`);

const basePath = `./src`;

module.exports = {
  webpack: {
    alias: {
      "@app": path.resolve(__dirname, `${basePath}/App/`),
      "@features": path.resolve(__dirname, `${basePath}/Features/`),
    },
  },
};