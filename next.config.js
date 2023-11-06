/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'kjghaocficigsrsghtzj.supabase.co',
            },
        ],
    },
};

module.exports = nextConfig;
