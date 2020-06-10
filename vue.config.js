const { modId } = require("./anymod.js");

module.exports = {
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].modId = modId;
      return args;
    });
  },
};
