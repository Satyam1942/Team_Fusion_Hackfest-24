require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add resolve fallback for 'crypto' module
    config.resolve.fallback = { "crypto": require.resolve("crypto-browserify") };
    
    return config;
  },
  solidity: "0.8.24",
};
