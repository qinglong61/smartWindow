var enabled = false;
var sw_video_lock;
var type;
var supportedUrlList = [
    "youku.com",
    "sina.com",
    "miaopai.com",
    "guancha.cn",
    "le.com",
    "pan.baidu.com",
    "bilibili.com",
    "ifeng.com"
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
            if (type == "youku.com" && $('#player').width()) {
                return true;
            } else
            if (type == "sina.com" && $('#myMovieBox').width()) {
                return true;
            } else
            if (type == "miaopai.com" && $('.video_flash').width()) {
                return true;
            } else
            if (type == "guancha.cn" && $('p embed').width()) {
                return true;
            } else
            if (type == "le.com" && $('#player').width()) {
                return true;
            } else
            if (type == "pan.baidu.com" && $('#video-wrap-inner embed').width()) {
                return true;
            } else
            if (type == "bilibili.com" && $('#player_placeholder').width()) {
                return true;
            } else
            if (type == "ifeng.com" && $('#js_playVideo').width()) {
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
    } else
    if (type == "guancha.cn") {
        videoDiv = $('p embed');
    } else
    if (type == "le.com") {
        videoDiv = $('#player');
    } else
    if (type == "pan.baidu.com") {
        videoDiv = $('#video-wrap-inner embed');
    } else
    if (type == "bilibili.com") {
        videoDiv = $('#player_placeholder');
    } else
    if (type == "ifeng.com") {
        videoDiv = $('#js_playVideo');
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
    } else
    if (type == "guancha.cn") {
        url = $('p embed').attr("src");
        console.log(url);
    } else
    if (type == "le.com") {
        url = $('#player embed').attr("src") + "?" + $('#player embed').attr("flashvars");
        console.log(url);
    } else
    if (type == "pan.baidu.com") {
        var flashvars = $('#video-wrap-inner embed').attr("flashvars");
        var reg = new RegExp("(^|&)" + "file" + "=([^&]*)(&|$)");
        var r = flashvars.match(reg);
        var file = r[0];
        url = "http://pan.baidu.com" + $('#video-wrap-inner embed').attr("src") + file;
        console.log(url);
    } else
    if (type == "bilibili.com") {
        url = $('#player_placeholder').attr("data") + "?" + $('#player_placeholder param[name="flashvars"]').attr("value");
        console.log(url);
    } else
    if (type == "ifeng.com") {
        url = $('#js_playVideo').attr("src") + "?" + $('#js_playVideo').attr("flashvars");
        console.log(url);
    }
    chrome.runtime.sendMessage({
        type:type,
        url:url
    }, function (window) {

    });
}
