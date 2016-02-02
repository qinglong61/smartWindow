var enabled = false;

$(document).ready(function() {
    chrome.storage.local.get('enabled', function (item) {
        enabled = item.enabled;
    });
    if (enabled) {
        chrome.runtime.sendMessage({
            type:'trans',
            data:selection
        }, function (response) {
            
        });
    }
});
