// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

// next.config.js
const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
    webpack: (config, { isServer }) => {
        // Resolve Cesium import alias
        config.resolve.alias = {
            ...config.resolve.alias,
            cesium: path.resolve(__dirname, 'node_modules/cesium/Source')
        };

        // Define Cesium-related globals
        config.plugins.push(
            new DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('/cesium')
            })
        );

        // Copy Cesium Assets, Widgets, and Workers to the static folder
        // config.module.rules.push({
        //     test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
        //     use: ['file-loader']
        // });

        if (!isServer) {
            // This is a workaround for the "window is not defined" error in SSR (Server Side Rendering)
            config.externals = config.externals.map(external => {
                if (typeof external !== 'function') return external;
                return (context, request, callback) => {
                    if (request.match(/^cesium/)) return callback();
                    return external(context, request, callback);
                };
            });
        }

        return config;
    },

    // We're going to add a server-side rewrite rule to serve the Cesium static files from /public/cesium
    async rewrites() {
        return [
            {
                source: '/cesium/:path*',
                destination: '/cesium/:path*' // Proxy to Folder
            }
        ];
    }
};