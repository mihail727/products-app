import { SortTypes } from '../types';

export default function () {
	const factory = (sortType: SortTypes, arr: IProduct[]) => {
		switch (sortType) {
			case 'По умолчанию': {
				return reset(arr);
			}
			case 'Наименование': {
				return byName(arr);
			}
			case 'Макс. цена': {
				return maxPrice(arr);
			}
			case 'Мин. цена': {
				return minPrice(arr);
			}
		}
	};

	const reset = (arr: IProduct[]) => {
		return arr.sort((a, b) => a.id - b.id);
	};
	const minPrice = (arr: IProduct[]) => {
		return arr.sort((a, b) => a.price - b.price);
	};
	const maxPrice = (arr: IProduct[]) => {
		return arr.sort((a, b) => b.price - a.price);
	};
	const byName = (arr: IProduct[]) => {
		return arr.sort((a, b) => a.name.localeCompare(b.name));
	};

	return { reset, minPrice, maxPrice, byName, factory };
}
