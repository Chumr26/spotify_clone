/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'akdmgbzioggndeowkemu.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            },
        ],
    },
};

module.exports = nextConfig;
