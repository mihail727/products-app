import { promiseTimeout } from '@vueuse/core';

export default () => {
	const productList = useState<IProduct[]>('product-list', () => null);
	const pending = ref(false);

	const setup = async () => {
		const list = useLocalStorage<IProduct[]>('product-list', null, {
			serializer: {
				read: (v: any) => (v ? JSON.parse(v) : null),
				write: (v: any) => JSON.stringify(v),
			},
		});

		if (!list.value || list.value.length < 1) {
			list.value = getInitialProducts();
		}

		productList.value = list.value;
	};

	const load = async () => {
		pending.value = true;
		await promiseTimeout(3000);
		pending.value = false;
		return productList.value.map((v) => v);
	};

	const add = (newProduct: IProduct) => {
		newProduct.id = productList.value.length + 1;
		productList.value.splice(productList.value.length, 0, newProduct);
		return productList.value.map((v) => v);
	};

	const removeById = (id: number) => {
		productList.value.splice(id, 1);
		return productList.value.map((v) => v);
	};

	return { setup, removeById, load, add, pending };
};

function getInitialProducts(): IProduct[] {
	return [
		{
			id: 1,
			name: 'Наименование товара 1',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 110000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			id: 2,
			name: 'Наименование товара 2',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 12000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			id: 3,
			name: 'Наименование товара 3',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 1000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			id: 4,
			name: 'Наименование товара 4',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10300,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			id: 5,
			name: 'Наименование товара 5',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10350,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
	];
}
