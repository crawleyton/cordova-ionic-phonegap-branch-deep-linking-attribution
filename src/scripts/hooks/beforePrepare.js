(function() {
  // properties

  const configPreferences = require("../npm/processConfigXml.js");
  const iosPlist = require("../ios/updatePlist.js");
  const iosAssociatedDomains = require("../ios/updateAssociatedDomains.js");
  const IOS = "ios";

  // entry
  module.exports = run;

  // builds before platform config
  function run(context) {
    let preferences;
    try {
      preferences = configPreferences.read(context);
    } catch (ohNo) {
      console.error("Aww shucks, the plugin config ain't alright, gonna skip Branch my dude");
      return;
    }
    const platforms = context.opts.cordova.platforms;

    platforms.forEach(platform => {
      if (platform === IOS) {
        iosPlist.addBranchSettings(preferences);
        iosAssociatedDomains.addAssociatedDomains(preferences);
      }
    });
  }
})();
