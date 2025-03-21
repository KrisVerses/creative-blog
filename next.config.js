const { withContentlayer } = require("next-contentlayer");

/**
 * NextJS Configuration Object
 * - reactStrictMode: Enables React Strict Mode for development
 *   which helps identify potential problems in the application
 *   and enforces stricter development rules
 */
const nextConfig = {
  reactStrictMode: true,
};

/**
 * Wrap the NextJS config with ContentLayer
 * withContentLayer is a higher-order function that enhances the Next.js config
 * to work with ContentLayer, which helps manage and transform content (like MDX files)
 * into type-safe data that can be imported into your Next.js pages
 */
module.exports = withContentlayer(nextConfig);

/*
An error will occur if you try to use .ts file extension on next.config.js. NextJS does not support config files written in TS.
*/
