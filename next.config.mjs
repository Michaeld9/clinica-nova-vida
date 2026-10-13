/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // Placeholders das fotos do corpo clínico — remover ao usar fotos reais
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
