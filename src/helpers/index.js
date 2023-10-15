import store from '@/redux/store';
import {BACKDROP_PATH} from '@/constants';

export const dispatch = action => store.dispatch(action);

export const dynamicBackground = path => {
    return {
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${BACKDROP_PATH(path)})`
    }
};

export const throttle = (callbackFn, limit) => {
    let wait = false;
    return function () {
        if (!wait) {
            callbackFn.call();
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
};

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const filterFetchResults = media => {
    if (media) {
        return (
            media.vote_count > 1 &&
            media.backdrop_path !== null &&
            media.budget !== 0 &&
            media.poster_path !== null &&
            media.overview !== ''
        )
    }
};
