// @ts-check
const pkg = require("./package.json")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const execSync = require("child_process").execSync

const cache = require("next-pwa/cache")
const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV === "development",

  dest: "public",
  publicExcludes: ["*"],
  runtimeCaching: [
    {
      urlPattern: ({ request }) => {
        return request.headers.get("x-middleware-prefetch")
      },
      handler: "NetworkOnly",
    },
    {
      urlPattern: ({ url }) => {
        return /\/ipfs\/([^/?#]+)$/.test(url.toString())
      },
      handler: "CacheFirst",
      options: {
        cacheName: "next-ipfs",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      // cspell:ignore Fipfs
      urlPattern: /\/_next\/image\?url=.+%2Fipfs%2F([^/?#]+)$/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-ipfs",
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
        },
      },
    },
    // @ts-ignore
    ...cache,
  ],
})

const lastCommitCommand = "git rev-parse HEAD"

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
  // @ts-ignore
  withPWA({
    env: {
      APP_DESCRIPTION: pkg.description,
    },
    experimental: {
      scrollRestoration: true,
      appDir: true,
    },
    output: "standalone",
    productionBrowserSourceMaps: true,

    webpack(config) {
      config.resolve.fallback = { fs: false } // polyfill node-id3

      config.externals.push("react-native")

      config.resolve.alias["cross-fetch"] = require.resolve(
        "next/dist/build/polyfills/fetch/index.js",
      )

      // https://github.com/kkomelin/isomorphic-dompurify/issues/54
      // Fix isomorphic-dompurify in app router
      config.externals = [...config.externals, "canvas", "jsdom"]

      return config
    },

    images: {
      dangerouslyAllowSVG: true,
      contentSecurityPolicy:
        "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline';",
      remotePatterns: [{ hostname: "**" }],
    },

    async generateBuildId() {
      return execSync(lastCommitCommand).toString().trim()
    },

    serverRuntimeConfig: {
      ENV_EXPIRE: process.env.EXPIRE,
    },
  }),
)
