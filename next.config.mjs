/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:["raw.githubusercontent.com"]
    },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
