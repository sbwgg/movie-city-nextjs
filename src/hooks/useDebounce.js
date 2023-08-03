import { useRef } from 'react';

const useDebounce = (callback, delay) => {
    const debounceTimerRef = useRef(null);

    function debouncedCallback(...args) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }

    return debouncedCallback;
};

export default useDebounce;