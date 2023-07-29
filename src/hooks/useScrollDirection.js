import React, {useEffect, useState} from 'react';
import {throttle} from '@/helpers';

const useScrollDirection = () => {
	const [isUp, setIsUp] = useState(false);
	const [isDown, setIsDown] = useState(false);

	useEffect(() => {
		let scrollY = 0;

		const handleScrollDirection = () => {
			let currentScrollY = window.scrollY;

			if (currentScrollY < scrollY) {
				setIsUp(true);
				setIsDown(false);
			} else {
				setIsUp(false);
				setIsDown(true);
			}

			currentScrollY <= 0 && setIsDown(false);

			scrollY = currentScrollY;
		};

		document.addEventListener('scroll', throttle(handleScrollDirection, 100));

		return () => document.removeEventListener('scroll', throttle(handleScrollDirection, 100));
	},[]);

	return {isUp, isDown};
};

export default useScrollDirection;
