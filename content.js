var enabled = false;
var sw_video_lock;
var type;
var supportedUrlList = [
    "youku.com",
    "sina.com",
    "miaopai.com"
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
            if (type == "youku.com" && $('#player')) {
                return true;
            } else
            if (type == "sina.com" && $('#myMovieBox')) {
                return true;
            } else
            if (type == "miaopai.com" && $('.video_flash')) {
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
    var videoDiv;
    if (type == "youku.com") {
        videoDiv = $('#player');
    } else
    if (type == "sina.com") {
        videoDiv = $('#myMovieBox');
    } else
    if (type == "miaopai.com") {
        videoDiv = $('.video_flash');
    }

    $('#sw_video').remove();
    $('body').append(html);

    $('#sw_video img').css({
        "display": "block",
        "zIndex": 1000,
        "width": 50,
        "height": 50,
        "position": "absolute",
        "top": videoDiv.offset().top,
        "left": videoDiv.offset().left - 50
    });

    $('#sw_video').mouseenter(function() {
        sw_video_lock = true;
    });
    $('#sw_video').mouseleave(function() {
        sw_video_lock = false;
    });
    $('#sw_video').hover(function(){
        $(this).css({"cursor":"pointer"})
    });
    $('#sw_video').click(function(event) {
        fetchVideoInfo();
    });
}

function fetchVideoInfo()
{
    var url = "";
    if (type == "youku.com") {
        url = $('#player param[name="movie"]').attr("value") + "?" + $('#player param[name="flashvars"]').attr("value");
        console.log(url);
    } else
    if (type == "sina.com") {
        url = $('#myMovieBox embed').attr("src") + "?" + $('#myMovieBox embed').attr("flashvars");
        console.log(url);
    } else
    if (type == "miaopai.com") {
        url = $('.video_flash embed').attr("src");
        console.log(url);
    }
    chrome.runtime.sendMessage({
        type:type,
        url:url
    }, function (window) {

    });
}
