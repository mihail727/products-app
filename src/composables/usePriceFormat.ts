export default function (value: string | number): string {
	return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/gm, '$1 ');
}
