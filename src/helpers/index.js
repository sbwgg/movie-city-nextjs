import store from '@/redux/store';
import moment from 'moment';

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
}

export const roundNumber = number => {
    return Math.round(number * 100) / 100;
};

export const extractYear = date => {
    return moment(date, 'YYYY/MM/DD').year();
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
}

export const lowercaseString  = str => {
    const replacedStr = str.replace(/[^a-zA-Z0-9]+/g, '-');

    return replacedStr.toLowerCase();
};
