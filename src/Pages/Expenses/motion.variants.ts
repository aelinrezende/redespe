export const bills = {
	container: {
		initial: {
			display: 'none',
		},
		hidden: {
			height: 0,
			opacity: 0,
			transitionEnd: {
				display: 'none',
			},
		},
		visible: { display: 'block', height: 'auto', opacity: 1 },
	},
	child: {
		hidden: {
			x: -50,
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
		},
		hover: { scale: 1.05 },
		exit: { x: 50, opacity: 0 },
	},
};
