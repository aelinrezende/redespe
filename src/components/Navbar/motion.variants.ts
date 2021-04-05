export const nav = {
	container: {
		hidden: {
			opacity: 0,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.9,
			},
			transitionEnd: {
				display: 'none',
			},
		},
		visible: { opacity: 1, display: 'block' },
	},

	child: {
		hidden: { y: 30 },
		visible: { y: 0 },
	},
};
