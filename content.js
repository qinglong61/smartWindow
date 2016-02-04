var enabled = false;
var sw_video_lock;
var type;
var supportedUrlList = [
    "youku.com"
];

$(document).ready(function() {
    chrome.storage.local.get('enabled', function (item) {
        enabled = item.enabled;
    });

    if (checkVideo()) {
        popover();
    }
});

function checkVideo() {
    for (var i = 0; i < supportedUrlList.length; i++) {
        if (window.location.hostname.indexOf(supportedUrlList[i]) != -1) {
            type = supportedUrlList[i];
            if (type == "youku.com" && $("#player")) {
                return true;
            }
        }
    }
    return false;
}

function popover() {
    var iconurl = chrome.extension.getURL("icon.png");
    var html = '<a class="sw_video" id="sw_video">' +
    '<img src="' + iconurl + '"/>' +
    '</a>';

    $('#sw_video img').css({
        "display":"block",
        "zIndex":1000,
        "width":25,
        "height":17,
        "position":"absolute",
        "top":ptop,
        "left":pleft
    });

    tmp.hover(function(){
        $(this).css({"cursor":"pointer"})
    });

    $('#sw_video').remove();
    $('body').append(html);

    $('#sw_video').mouseenter(function() {
        sw_video_lock = true;
    });
    $('#sw_video').mouseleave(function() {
        sw_video_lock = false;
    });
    $("#sw_video").click(function(event) {
        fetchVideoInfo();
    });
}

function fetchVideoInfo()
{
    var url = "";
    if (type == "youku.com") {
        url = $("param [name='movie']").attr("value") + "?" + $("param [name='flashvars']").attr("value");
        console.log(url);
    }
    chrome.runtime.sendMessage({
        type:type,
        url:url
    }, function (response) {

    });
}
