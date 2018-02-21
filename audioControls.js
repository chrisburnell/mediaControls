/*!
 * YouTube-like Keyboard Controls for HTML Audio
 * @author Chris Burnell <me@chrisburnell.com>
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

        function addEventListenerMultiple(element, events, listener) {
            events.split(' ').forEach(event => element.addEventListener(event, listener, false));
        }

        for (let audioElement of audioElements) {
            addEventListenerMultiple(audioElement, 'focus play pause seeking seeked volumechange', () => {
                audio = audioElement;
            });
        }

        const keys = {
            32:     'play-pause',       // Spacebar
            75:     'play-pause',       // K
            37:     'rewind-5',         // Left Arrow
            39:     'forward-5',        // Right Arrow
            74:     'rewind-10',        // J
            76:     'forward-10',       // L
            38:     'volume-up',        // Up Arrow
            40:     'volume-down',      // Down Arrow
            77:     'mute-unmute',      // M
            68:     'speed-up',         // D
            187:    'speed-up',         // = / +
            65:     'speed-down',       // A
            189:    'speed-down',       // - / _
            83:     'speed-default'     // S
        }

        const actions = {
            'play-pause': {
                name: ['Play / Pause'],
                keys: ['Spacebar', 'K'],
                action: () => { audio.paused ? audio.play() : audio.pause() }
            },
            'rewind-5': {
                name: ['Rewind 5s'],
                keys: ['◀'],
                action: () => { audio.currentTime = currentTime < 5 ? 0 : currentTime - 5 }
            },
            'forward-5': {
                name: ['Forward 5s'],
                keys: ['▶'],
                action: () => { audio.currentTime = duration - currentTime < 5 ? duration : currentTime + 5 }
            },
            'rewind-10': {
                name: ['Rewind 10s'],
                keys: ['J'],
                action: () => { audio.currentTime = currentTime < 10 ? 0 : currentTime - 10 }
            },
            'forward-10': {
                name: ['Forward 10s'],
                keys: ['L'],
                action: () => { audio.currentTime = duration - currentTime < 10 ? duration : currentTime + 10 }
            },
            'volume-down': {
                name: ['Volume Up 10%'],
                keys: ['▼'],
                action: () => { audio.volume = volume == 0 ? 0 : volume - 0.1 }
            },
            'volume-up': {
                name: ['Volume Down 10%'],
                keys: ['▲'],
                action: () => { audio.volume = volume == 1 ? 1 : volume + 0.1 }
            },
            'mute-unmute': {
                name: ['Mute / Unmute'],
                keys: ['M'],
                action: () => { audio.muted = !audio.muted }
            },
            'speed-down': {
                name: ['Playback Rate Down 25%'],
                keys: ['A', '-', '_'],
                action: () => { audio.playbackRate = playbackRate == 0.25 ? 0.25 : playbackRate - 0.25 }
            },
            'speed-up': {
                name: ['Playback Rate Up 25%'],
                keys: ['D', '=', '+'],
                action: () => { audio.playbackRate = playbackRate == 2 ? 2 : playbackRate + 0.25 }
            },
            'speed-default': {
                name: ['Playback Rate Set to 100%'],
                keys: ['S'],
                action: () => { audio.playbackRate = 1 }
            },
            'seek-0': {
                name: ['Seek to Start'],
                keys: ['0'],
                action: () => { audio.currentTime = 0 }
            },
            'seek-1': {
                name: ['Seek to 10%'],
                keys: ['1'],
                action: () => { audio.currentTime = 0.1 }
            },
            'seek-2': {
                name: ['Seek to 20%'],
                keys: ['2'],
                action: () => { audio.currentTime = 0.2 }
            },
            'seek-3': {
                name: ['Seek to 30%'],
                keys: ['3'],
                action: () => { audio.currentTime = 0.3 }
            },
            'seek-4': {
                name: ['Seek to 40%'],
                keys: ['4'],
                action: () => { audio.currentTime = 0.4 }
            },
            'seek-5': {
                name: ['Seek to 50%'],
                keys: ['5'],
                action: () => { audio.currentTime = 0.5 }
            },
            'seek-6': {
                name: ['Seek to 60%'],
                keys: ['6'],
                action: () => { audio.currentTime = 0.6 }
            },
            'seek-7': {
                name: ['Seek to 70%'],
                keys: ['7'],
                action: () => { audio.currentTime = 0.7 }
            },
            'seek-8': {
                name: ['Seek to 80%'],
                keys: ['8'],
                action: () => { audio.currentTime = 0.8 }
            },
            'seek-9': {
                name: ['Seek to 90%'],
                keys: ['9'],
                action: () => { audio.currentTime = 0.9 }
            }
        };

        window.addEventListener('keydown', (event) => {
            keyCode = event.keyCode ? event.keyCode : event.which;
            currentTime = audio.currentTime;
            duration = audio.duration;
            volume = muted ? volume : audio.volume;
            playbackRate = audio.playbackRate;

            for (const [key, action] of Object.entries(keys)) {
                if (key == keyCode) {
                    event.stopPropagation();
                    event.preventDefault();
                    actions[action].action();
                }
            }
        });
    }
})();
