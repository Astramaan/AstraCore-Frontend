/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This allows the Next.js dev server to accept requests from the
    // Firebase Studio environment.
    allowedDevOrigins: [
      "https://9000-firebase-studio-1755838622226.cluster-nle52mxuvfhlkrzyrq6g2cwb52.cloudworkstations.dev",
    ],
  },
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
};

module.exports = nextConfig;
