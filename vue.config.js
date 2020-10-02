module.exports = {
  devServer: {
    proxy: {
      "^": {
        target: "http://backend:3000",
        ws: true,
        changeOrigin: true,
      },
    },
    allowedHosts: [".eu.ngrok.io", "localhost"],
  },
};
