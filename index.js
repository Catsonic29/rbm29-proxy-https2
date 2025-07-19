const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(
  "/stream",
  createProxyMiddleware({
    target: "https://uk22freenew.listen2myradio.com",
    secure: true,
    changeOrigin: true,
    pathRewrite: {
      "^/stream": "/live.mp3?typeportmount=s1_19211_stream_40682758"
    },
    onProxyReq(proxyReq) {
      proxyReq.setHeader("User-Agent", "Mozilla/5.0");
    }
  })
);

app.listen(PORT, () => console.log(`Proxy RBM29 en HTTPS écoute sur port ${PORT}`));