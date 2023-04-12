module.exports = {
  devServer: {
    client: {
      webSocketURL: 'ws://0.0.0.0:3000/ws'
    },
    proxy: {
      "^/": {
        target: "http://backend:3000",
        changeOrigin: true,
      },
    },
    allowedHosts: [".gitpod.io", ".eu.ngrok.io", "localhost"],
  },
};
