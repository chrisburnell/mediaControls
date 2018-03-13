/*!
 * Audio Controls
 * YouTube-like Keyboard Controls for HTML Audio
 * @author Chris Burnell <me@chrisburnell.com>
 * @version 1.1.1
 */


(() => {

    'use strict';


    const audioElements = document.querySelectorAll('audio');

    if (!!audioElements.length) {
        let audio = audioElements[0] ? audioElements[0] : undefined;
        let currentTime;
        let duration;
        let volume;
        let muted = false;
        let playbackRate;
        let keyCode;
        let keyData;

        for (let audioElement of audioElements) {
            ['focus', 'play', 'pause', 'seeking', 'seeked', 'volumechange'].forEach(event => {
                audioElement.addEventListener(event, () => {
                    audio = audioElement;
                });
            });
        }

        function keyMap(physicalKey, action) {
            this.physicalKey = physicalKey;
            this.action = action;
        }

        const keys = {
            32:  new keyMap('spacebar', 'play-pause'),
            75:  new keyMap('k',        'play-pause'),
            37:  new keyMap('◀',        'rewind-5'),
            39:  new keyMap('▶',        'forward-5'),
            74:  new keyMap('j',        'rewind-10'),
            76:  new keyMap('l',        'forward-10'),
            34:  new keyMap('pagedown', 'rewind-30'),
            33:  new keyMap('pageup',   'forward-30'),
            38:  new keyMap('▲',        'volume-up'),
            40:  new keyMap('▼',        'volume-down'),
            77:  new keyMap('m',        'mute-unmute'),
            68:  new keyMap('d',        'speed-up'),
            187: new keyMap('=',        'speed-up'),
            65:  new keyMap('a',        'speed-down'),
            189: new keyMap('-',        'speed-down'),
            83:  new keyMap('s',        'speed-default'),
            36:  new keyMap('home',     'start'),
            35:  new keyMap('end',      'end')
        }
        // 0–9
        const numberKeys = Array(10).fill().map((_, index) => 48 + index);
        for (let numberKey in numberKeys) {
            keys[numberKeys[numberKey]] = new keyMap(`${numberKey}`, 'seek');
        }
        // Num0–Num9
        const numpadKeys = Array(10).fill().map((_, index) => 96 + index);
        for (let numpadKey in numpadKeys) {
            keys[numpadKeys[numpadKey]] = new keyMap(`${numpadKey}`, 'seek');
        }

        const actions = {
            'play-pause':    () => { audio.paused ? audio.play() : audio.pause() },
            'rewind-5':      () => { audio.currentTime = currentTime < 5 ? 0 : currentTime - 5 },
            'forward-5':     () => { audio.currentTime = duration - currentTime < 5 ? duration : currentTime + 5 },
            'rewind-10':     () => { audio.currentTime = currentTime < 10 ? 0 : currentTime - 10 },
            'forward-10':    () => { audio.currentTime = duration - currentTime < 10 ? duration : currentTime + 10 },
            'rewind-30':     () => { audio.currentTime = currentTime < 30 ? 0 : currentTime - 30 },
            'forward-30':    () => { audio.currentTime = duration - currentTime < 30 ? duration : currentTime + 30 },
            'volume-down':   () => { audio.volume = volume <= 0.05 ? 0 : +(volume - 0.05).toFixed(2) },
            'volume-up':     () => { audio.volume = volume >= 0.95 ? 1 : +(volume + 0.05).toFixed(2) },
            'mute-unmute':   () => { audio.muted = !audio.muted },
            'speed-down':    () => { audio.playbackRate = playbackRate == 0.25 ? 0.25 : +(playbackRate - 0.25).toFixed(2) },
            'speed-up':      () => { audio.playbackRate = playbackRate == 2 ? 2 : +(playbackRate + 0.25).toFixed(2) },
            'speed-default': () => { audio.playbackRate = 1 },
            'start':         () => { audio.currentTime = 0 },
            'end':           () => { audio.currentTime = duration },
            'seek':          key => { audio.currentTime = parseInt(key) / 10 * duration }
        };

        window.addEventListener('keydown', event => {
            keyCode = event.keyCode ? event.keyCode : event.which;
            currentTime = audio.currentTime;
            duration = audio.duration;
            volume = muted ? volume : audio.volume;
            playbackRate = audio.playbackRate;
            keyData = Object.keys(keys).filter(key => key == keyCode).reduce((_, key) => keys[key], undefined);

            if (keyData !== undefined) {
                event.stopPropagation();
                event.preventDefault();
                actions[keyData.action](keyData.physicalKey);
            }
        });
    }
})();
