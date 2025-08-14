// babel.config.js
module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      // Add the plugins array below
      plugins: [
        '@babel/plugin-transform-class-static-block'
      ]
    };
};