import { cra } from "./cra";
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

/**
 * Okay, it goes without saying that this is very experimental, 
 * so use it at your own risk.
 * https://github.com/facebook/create-react-app/blob/b45ae3c9caf10174d53ced1cad01a272d164f8de/packages/react-scripts/config/webpack.config.js#L314
 */
export function removeModuleScopePlugin() {
  cra.config((factory) => {
    return (env) => {
      const config = factory(env);

      if (config.resolve?.plugins) {
        config.resolve.plugins = config.resolve.plugins.filter(
          (plugin) => !(plugin instanceof ModuleScopePlugin)
        );
      }

      return config;
    };
  });
}
