export const overlay = {
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export const container = {
	initial: { scale: 0.75 },
	visible: { scale: 1 },
	exit: {
		scale: [1, 1.1],
		opacity: 0,
	},
};
