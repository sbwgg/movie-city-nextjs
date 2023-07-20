import store from '@/redux/store';

export const dispatch = action => {
    store.dispatch(action);
};

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