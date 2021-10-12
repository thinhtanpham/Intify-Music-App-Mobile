import {ADD_PLAYING, RE_PLAYING} from '../Type/isPlayingType';

export function addPlaying(music) {
    return {
        type: ADD_PLAYING,
        music
    };
}

export function rePlaying(music) {
    return {
        type: RE_PLAYING,
        music
    };
}
