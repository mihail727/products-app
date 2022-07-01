export default function () {
	const formatForView = (value: number | string): string => {
		return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/gm, '$1 ');
	};

	const formatForData = (value: string): number => {
		return parseInt(value.split(' ').join(''));
	};

	return { formatForData, formatForView };
}
