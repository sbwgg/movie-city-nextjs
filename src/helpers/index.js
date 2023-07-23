import store from '@/redux/store';

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

export const throttle = (func, limit) => {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
