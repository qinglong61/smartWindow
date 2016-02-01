chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url:"http://www.baidu.com",
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

    });
});
