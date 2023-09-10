import store from '@/redux/store';
import moment from 'moment';
import {BACKDROP_PATH} from '@/constants';

export const dispatch = action => {
    store.dispatch(action);
};

export const sliderListOptions = {
    slidesPerView: 2,
    slidesPerGroup: 2,
    speed: 800,
    breakpoints: {
        768:{
            slidesPerView: 3,
            slidesPerGroup: 3
        },
        1024:{
            slidesPerView: 4.5,
            slidesPerGroup: 4
        }
    }
};

export const dynamicBackground = path => {
    return {
        backgroundImage: `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url(${BACKDROP_PATH(path)})`
    }
}

export const roundNumber = number => Math.round(number * 100) / 100;

export const extractYear = date => moment(date, 'YYYY/MM/DD').year();

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
}

export const lowercaseString = str => {
    if (str) {
        const replacedStr = str.replace(/[^a-zA-Z0-9]+/g, '-');

        return replacedStr.toLowerCase();
    }
};

export const capitalizeFirstLetter = text => {
    return text && text.charAt(0).toUpperCase() + text.slice(1);
};

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const truncateText = (text, limit) => {
    if (text.length > limit) {
        const words = text.split(' ');
        let truncatedText = '';
        for (const word of words) {
            if ((truncatedText + word).length <= limit - 3) {
                truncatedText += word + ' ';
            } else {
                break;
            }
        }
        return truncatedText.trim() + '...';
    } else {
        return text;
    }
};
