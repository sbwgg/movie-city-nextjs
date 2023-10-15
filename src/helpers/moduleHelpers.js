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

export const floatUpVariants = {
	floatUp: {
		opacity: 1,
		translateY: '0px'
	},

	floatDown: {
		opacity: 0,
		translateY: '40px'
	}
};

export const fadeInVariants = {
	show: {
		opacity: 1
	},

	hide: {
		opacity: 0
	}
};
