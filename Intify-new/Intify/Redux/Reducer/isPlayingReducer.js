import { is } from 'immer/dist/internal';
import {ADD_PLAYING, RE_PLAYING} from '../Type/isPlayingType';

const isPlaying = {
    rePlaying: {},
    isPlaying: {},
};

function isPlayingReducer(state = isPlaying, action) {
switch (action.type) {
    case ADD_PLAYING:
        state.isPlaying = action.music
        state.isPlaying = {...state.isPlaying}
        return {...state};

    case RE_PLAYING:
        state.rePlaying = action.music;
        state.rePlaying = {...state.rePlaying};
        return {...state};

    default:
        return {...state};
}
}

export default isPlayingReducer;
