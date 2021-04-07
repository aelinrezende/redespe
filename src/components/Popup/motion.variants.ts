export const overlay = {
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export const container = {
	initial: { scale: 0.75, y: '50%' },
	visible: { scale: 1, y: '50%' },
	exit: {
		scale: [1, 1.1],
		opacity: 0,
		y: '50%',
	},
};
