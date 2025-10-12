/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  poweredByHeader: false,
  webpack: (config, { isServer }) => {
    // These are required by Genkit to trace and log.
    // However, they are not used in the browser.
    // This configuration tells Webpack to ignore them when building for the browser.
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
        "pino-pretty": false,
        "google-auth-library": false,
      };
    }
    // These are provided by Netlify and are not needed for local development.
    config.externals.push("@opentelemetry/exporter-jaeger");
    config.externals.push("@genkit-ai/firebase");
    return config;
  },
};

module.exports = nextConfig;
