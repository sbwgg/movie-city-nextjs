export const debounce = (fn, delay = 300) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId);
        }
        timeOutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
