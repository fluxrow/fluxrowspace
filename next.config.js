/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.canva.com',
            },
            {
                protocol: 'https',
                hostname: '**.fbcdn.net',
            },
            {
                protocol: 'https',
                hostname: '**.cdninstagram.com',
            },
            {
                protocol: 'https',
                hostname: 'oaidalleapiprodscus.blob.core.windows.net',
            }
        ],
    },
};

module.exports = nextConfig;
