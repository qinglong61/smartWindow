chrome.browserAction.onClicked.addListener(function(tab) {

});

chrome.runtime.onMessage.addListener(function (request, sender, callback) {
    console.log(request);
    if (request.type == "youku.com") {
        newWindow(request.url, callback);
    }
    return true;
});

function newWindow(url, callback) {
    chrome.windows.create({
        url:url,
        // tabId:tab.id,
        left:0,
        top:0,
        width:500,
        height:500,
        focused:true,
        incognito:false,
        type:"panel", //需要启用chrome://flags/下面的--enable-panels，才能让window保持在最上层
        state:"docked"
    }, function (window) {
        callback(window);
    });
}
