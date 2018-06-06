/*!
 * Media Controls
 * YouTube-like Keyboard Controls for HTML Audio and Video
 * @author Chris Burnell <me@chrisburnell.com>
 * @version 1.1.2
 */


(() => {

    'use strict';


    const mediaElements = document.querySelectorAll('audio, video');

    if (!!mediaElements.length) {
        let media = mediaElements[0] ? mediaElements[0] : undefined;
        let currentTime;
        let duration;
        let volume;
        let muted = false;
        let playbackRate;
        let keyCode;
        let keyData;

        for (let mediaElement of mediaElements) {
            ['focus', 'play', 'pause', 'seeking', 'seeked', 'volumechange'].forEach(event => {
                mediaElement.addEventListener(event, () => {
                    media = mediaElement;
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
            48:  new keyMap('0',        'speed-default'),
            36:  new keyMap('home',     'start'),
            35:  new keyMap('end',      'end')
        }
        // 1–9
        const numberKeys = Array(9).fill().map((_, index) => 49 + index);
        for (let numberKey in numberKeys) {
            keys[numberKeys[numberKey]] = new keyMap(numberKey, 'seek');
        }
        // Num1–Num9
        const numpadKeys = Array(9).fill().map((_, index) => 97 + index);
        for (let numpadKey in numpadKeys) {
            keys[numpadKeys[numpadKey]] = new keyMap(numpadKey, 'seek');
        }

        function rangeMap(value, oldMinimum, oldMaximum, newMinimum, newMaximum) {
            return newMinimum + (newMaximum - newMinimum) * (value - oldMinimum) / (oldMaximum - oldMinimum);
        }

        const actions = {
            'play-pause':    () => { media.paused ? media.play() : media.pause() },
            'rewind-5':      () => { media.currentTime = currentTime < 5 ? 0 : currentTime - 5 },
            'forward-5':     () => { media.currentTime = duration - currentTime < 5 ? duration : currentTime + 5 },
            'rewind-10':     () => { media.currentTime = currentTime < 10 ? 0 : currentTime - 10 },
            'forward-10':    () => { media.currentTime = duration - currentTime < 10 ? duration : currentTime + 10 },
            'rewind-30':     () => { media.currentTime = currentTime < 30 ? 0 : currentTime - 30 },
            'forward-30':    () => { media.currentTime = duration - currentTime < 30 ? duration : currentTime + 30 },
            'volume-down':   () => { media.volume = volume <= 0.05 ? 0 : +(volume - 0.05).toFixed(2) },
            'volume-up':     () => { media.volume = volume >= 0.95 ? 1 : +(volume + 0.05).toFixed(2) },
            'mute-unmute':   () => { media.muted = !media.muted },
            'speed-down':    () => { media.playbackRate = playbackRate == 0.25 ? 0.25 : +(playbackRate - 0.25).toFixed(2) },
            'speed-up':      () => { media.playbackRate = playbackRate == 2 ? 2 : +(playbackRate + 0.25).toFixed(2) },
            'speed-default': () => { media.playbackRate = 1 },
            'start':         () => { media.currentTime = 0 },
            'end':           () => { media.currentTime = duration },
            'seek':          (key) => { media.currentTime = rangeMap(parseInt(key), 0, 8, 0, duration) }
        };

        window.addEventListener('keydown', event => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) {
                return;
            }

            keyCode = event.keyCode ? event.keyCode : event.which;
            currentTime = media.currentTime;
            duration = media.duration;
            volume = muted ? volume : media.volume;
            playbackRate = media.playbackRate;
            keyData = Object.keys(keys).filter(key => key == keyCode).reduce((_, key) => keys[key], undefined);

            if (keyData !== undefined) {
                event.stopPropagation();
                event.preventDefault();
                actions[keyData.action](keyData.physicalKey);
            }
        });
    }
})();
