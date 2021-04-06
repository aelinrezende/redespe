const formatDate = (date: string): string => {
	const months = [
		'Jan',
		'Fev',
		'Mar',
		'Abr',
		'Mai',
		'Jun',
		'Jul',
		'Ago',
		'Set',
		'Out',
		'Nov',
		'Dez',
	];
	const newDate = new Date(date);

	return `${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;
};

const sortByDate = (a: string, b: string): number => {
	return new Date(a).valueOf() - new Date(b).valueOf();
};

const sortArrayOfObjByDate = (array: any[], key: string): any[] => {
	return array.sort((a, b) => sortByDate(a[key], b[key])).reverse();
};

export { formatDate, sortByDate, sortArrayOfObjByDate };
