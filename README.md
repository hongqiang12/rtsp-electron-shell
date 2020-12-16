
<h1 align="center">
  <a href="https://mpv.io/">
    <img src="https://i.imgur.com/qQFg0aI.png" alt="mpv" width="200">
  </a>
  <br>mpv.js<br><br>
</h1>

<h4 align="center">
  All format embeddable player for Electron/NW.js applications.
  <br>Powered by marvelous <a href="https://mpv.io/">mpv</a>.
</h4>

<p align="center">
  <a href="https://travis-ci.org/Kagami/mpv.js">
    <img src="https://img.shields.io/travis/Kagami/mpv.js.svg" alt="Travis">
  </a>
  <a href="https://npmjs.org/package/mpv.js">
    <img src="https://img.shields.io/npm/v/mpv.js.svg" alt="NPM">
  </a>
</p>

## rtsp-electron-shell
支持rtsp的electron外壳

## Get libmpv

In order to try mpv.js you need to install mpv library first.

* Windows: download [mpv-dev](https://mpv.srsfckn.biz/mpv-dev-latest.7z), unpack, put corresponding `mpv-1.dll` to `C:\Windows\system32`


## Example

![](https://i.imgur.com/tLFkATs.png)

[Simple Electron application](example) yet capable of handling pretty much any available video thanks to mpv. Run:

```bash
git clone https://github.com/hongqiang12/rtsp-electron-shell.git && cd rtsp-electron-shell
npm install
npm run dev
```

## Usage

### Use MPV component (javascript example)

```javascript
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
```

## Build using

* Windows: download [mpv-dev](https://mpv.srsfckn.biz/mpv-dev-latest.7z), unpack, put corresponding `mpv-1.dll` to `C:\Windows\system32`

将`mpv-1.dll`放到构建完的`rtsp-electron-shell-win32-x64`文件目录下也可以


## Applications using mpv.js

* [mpv.js](https://github.com/Kagami/mpv.js)

Feel free to PR your own.