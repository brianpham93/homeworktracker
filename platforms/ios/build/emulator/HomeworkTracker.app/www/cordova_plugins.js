cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/uk.co.ilee.nativetransitions/www/nativetransitions.js",
        "id": "uk.co.ilee.nativetransitions.NativeTransitions",
        "clobbers": [
            "nativetransitions"
        ]
    },
    {
        "file": "plugins/localnotification/www/localnotification.js",
        "id": "localnotification.LocalNotification",
        "clobbers": [
            "localNotifier"
        ]
    },
    {
        "file": "plugins/de.appplant.cordova.plugin.local-notification/www/local-notification.js",
        "id": "de.appplant.cordova.plugin.local-notification.LocalNotification",
        "clobbers": [
            "plugin.notification.local"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "uk.co.ilee.nativetransitions": "0.1.3",
    "localnotification": "0.1.0",
    "de.appplant.cordova.plugin.local-notification": "0.7.4",
    "org.apache.cordova.device": "0.2.10-dev"
}
// BOTTOM OF METADATA
});