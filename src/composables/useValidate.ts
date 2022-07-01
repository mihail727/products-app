export default function () {
	const isNotEmpty = (value: string) => {
		return value.trim().length > 0;
	};

	return { isNotEmpty };
}
