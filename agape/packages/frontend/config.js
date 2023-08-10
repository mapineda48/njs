const configExport = require("react-scripts/config/webpack.config");
const configCache = require.resolve("react-scripts/config/webpack.config");
const configMod = require.cache[configCache];


function setConfig(env) {
    const paths = require("react-scripts/config/paths");
    const config = configExport(env);
    const [rule] = config.module.rules.filter(val => Boolean(val.oneOf));

    // Process any TS outside of the app with ts-loader.
    rule.oneOf.push({
        test: /\.ts$/,
        loader: require.resolve("ts-loader"),
        exclude: /node_modules/,
        options: {
            transpileOnly: true,
            configFile: paths.appTsConfig,
        },
    });

    return config;
}

require.cache[configCache] = {
    ...configMod,
    exports: setConfig,
};