var video1 = "demo1.mp4"; //Put in the RTSP address
var video2 = "demo2.mp4";

var embed = document.createElement("embed");
embed.setAttribute("style", "");
embed.style.width = "100%";
embed.style.height = "100%";
embed.style.position = "absolute";
embed.style.top = 0;
embed.style.left = 0;
document.body.append(embed);

var mpv = new MPV(
    embed,
    {
        hwdec: true,
        src: "",
        loop: false, // if set 'true'. !!! no events <pause，ended>.
        volume: 100, // 0 ~ 100
        autoplay: true,
    },
    function (e) {
        if (e.name == "ready") {
            console.info("mpv ready.");
            // ...
            mpv.loadfile(video1, true);
        } else if (e.name == "play") {
            console.info("play.");
        } else if (e.name == "duration") {
            console.info("duration is ", e.value);
        } else if (e.name == "progress") {
            // console.info("progress >>> ", e.value);
        } else if (e.name == "pause") {
            console.info("pause.");
        } else if (e.name == "ended") {
            console.info("ended.");
            mpv.loadfile(video2, true);
        }
    }
);