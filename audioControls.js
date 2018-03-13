/*!
 * Audio Controls
 * YouTube-like Keyboard Controls for HTML Audio
 * @author Chris Burnell <me@chrisburnell.com>
 * @version 1.1.0
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

        function key(physicalKey, action) {
            this.physicalKey = physicalKey;
            this.action = action;
        }

        const keys = {
            32: new key('spacebar', 'play-pause'),
            75: {
                physicalKey: 'k',
                action: 'play-pause'
            },
            37: {
                physicalKey: '◀',
                action: 'rewind-5'
            },
            39: {
                physicalKey: '▶',
                action: 'forward-5'
            },
            74: {
                physicalKey: 'j',
                action: 'rewind-10'
            },
            76: {
                physicalKey: 'l',
                action: 'forward-10'
            },
            34: {
                physicalKey: 'pagedown',
                action: 'rewind-30'
            },
            33: {
                physicalKey: 'pageup',
                action: 'forward-30'
            },
            38: {
                physicalKey: '▲',
                action: 'volume-up'
            },
            40: {
                physicalKey: '▼',
                action: 'volume-down'
            },
            77: {
                physicalKey: 'm',
                action: 'mute-unmute'
            },
            68: {
                physicalKey: 'd',
                action: 'speed-up'
            },
            187: {
                physicalKey: '=',
                action: 'speed-up'
            },
            65: {
                physicalKey: 'a',
                action: 'speed-down'
            },
            189: {
                physicalKey: '-',
                action: 'speed-down'
            },
            83: {
                physicalKey: 's',
                action: 'speed-default'
            },
            36: {
                physicalKey: 'home',
                action: 'start'
            },
            35: {
                physicalKey: 'end',
                action: 'end'
            }
        }
        // 0–9
        const numberKeys = Array(10).fill().map((_, index) => 48 + index);
        for (let numberKey in numberKeys) {
            keys[numberKeys[numberKey]] = { physicalKey: `${numberKey}`, action: 'seek' };
        }
        // Num0–Num9
        const numpadKeys = Array(10).fill().map((_, index) => 96 + index);
        for (let numpadKey in numpadKeys) {
            keys[numpadKeys[numpadKey]] = { physicalKey: `${numpadKey}`, action: 'seek' };
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
            'speed-down':    () => { audio.playbackRate = playbackRate == 0.25 ? 0.25 : playbackRate - 0.25 },
            'speed-up':      () => { audio.playbackRate = playbackRate == 2 ? 2 : playbackRate + 0.25 },
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
