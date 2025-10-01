
import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@ionic/react', '@ionic/core', '@stencil/core', 'ionicons'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
  experimental: {
    allowedDevOrigins: [
      'https://6000-firebase-studio-1755838622226.cluster-nle52mxuvfhlkrzyrq6g2cwb52.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
