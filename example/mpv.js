(function () {
    function MPV (embed, options, callback) {
        var thiz = this;

        var hwdec = options.hwdec == true ? true : false,
            src = options.src || "",
            loop = options.loop == true ? true : false,
            volume = options.volume != null ? options.volume : 100,
            autoplay = options.autoplay == true ? true : false;

        thiz.mpv = embed;
        thiz.mpv.type = 'application/x-mpvjs';

        thiz.mpv.addEventListener("message", function (e) {
            if (e.data.type == 'ready') {
                thiz.loadfile(src);

                if (hwdec) thiz.setProperty("hwdec", "vaapi-copy");
                if (volume != null) thiz.setVolume(volume);
                if (loop) thiz.setProperty("loop-file", "inf");
                if (autoplay) thiz.play();

                thiz.mpv.postMessage({
                    type: 'observe_property',
                    data: "duration"
                });

                thiz.mpv.postMessage({
                    type: 'observe_property',
                    data: "time-pos"
                });

                thiz.mpv.postMessage({
                    type: 'observe_property',
                    data: "pause"
                });

                thiz.mpv.postMessage({
                    type: 'observe_property',
                    data: "eof-reached"
                });

                callback && callback({
                    "name": "ready"
                });
            }
            else if (e.data.type == "property_change"){
                if (e.data.data.name == "duration") {
                    callback && callback({
                        "name": "duration",
                        "value": e.data.data.value,
                    });
                }
                else if (e.data.data.name == "time-pos") {
                    callback && callback({
                        "name": "progress",
                        "value": e.data.data.value,
                    });
                }
                else if (e.data.data.name == "pause" && !e.data.data.value) {
                    callback && callback({
                        "name": "play",
                    });
                }
                else if (e.data.data.name == "pause" && e.data.data.value) {
                    callback && callback({
                        "name": "pause",
                    });
                }
                else if (e.data.data.name == "eof-reached" && e.data.data.value) {
                    callback && callback({
                        "name": "ended",
                    });
                }
            }
        });

        return thiz;
    }

    MPV.prototype.setProperty = function (name, value) {
        this.mpv.postMessage({
            type: 'set_property',
            data: {
                name: name,
                value: value,
            }
        });

        return this;
    };

    MPV.prototype.sendCommand = function (name, value) {
        var data = [];
        if (name) data.push(name);
        if (value) data.push(value);

        this.mpv.postMessage({
            type: 'command',
            data: data,
        });

        return this;
    };

    MPV.prototype.loadfile = function (src, autoplay = true) {
        this.sendCommand("loadfile", src);
        if (!autoplay) {
            this.pause();
        }
        else {
            this.play();
        }

        return this;
    };

    MPV.prototype.play = function () {
        this.setProperty("pause", false);

        return this;
    };

    MPV.prototype.pause = function () {
        this.setProperty("pause", true);

        return this;
    };

    MPV.prototype.replay = function () {
        this.setProperty("time-pos", 0);
        this.setProperty("pause", false);

        return this;
    };

    MPV.prototype.setVolume = function (volume) {
        this.setProperty("volume", volume);

        return this;
    };

    MPV.prototype.destroy = function () {
        this.pause();
        this.sendCommand("stop", null);
        this.mpv.remove();
        return this;
    };

    window.MPV = MPV;
    return MPV;
})();