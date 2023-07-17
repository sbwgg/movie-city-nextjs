import React, {useEffect} from 'react';

const useClickOutSide = (ref, callback, excludeRef) => {
	useEffect(() => {
		const handleClickOutSide = (event) => {
			if (ref.current && !ref.current.contains(event.target) && !excludeRef?.current.contains(event.target)) {
				callback(event);
			}
		};

		const handleEscapeKey = (event) => {
			if (event.key == 'Escape') {
				callback(event);
			}
		};

		document.addEventListener('click', handleClickOutSide);
		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			document.removeEventListener('click', handleClickOutSide);
			document.removeEventListener('keydown', handleEscapeKey);
		}
	}, [ref, callback, excludeRef]);
}

export default useClickOutSide;
