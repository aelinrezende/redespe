export const nav = {
	container: {
		hidden: {
			opacity: 0,
			transition: {
				staggerChildren: 0.1,
			},
			transitionEnd: {
				display: 'none',
			},
		},
		visible: { opacity: 1, display: 'block' },
	},

	child: {
		hidden: { y: -30 },
		visible: { y: 0 },
		hover: {
			boxShadow: '0 16px 11px -10px rgb(6 11 29)',
			scale: 1.15,
		},
	},
};

export const button = {
	hover: {
		boxShadow: '0 18px 15px -10px rgb(0 0 0 / 100%)',
	},
};
