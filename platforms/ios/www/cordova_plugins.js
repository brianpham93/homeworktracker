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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "uk.co.ilee.nativetransitions": "0.1.3",
    "localnotification": "0.1.0"
}
// BOTTOM OF METADATA
});