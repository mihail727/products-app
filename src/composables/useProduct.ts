export default () => {
	const productList = useState<IProduct[]>('product-list', () => null);

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

	const removeById = (id: number) => {
		productList.value.splice(id, 1);
	};

	return { productList, setup, removeById };
};

function getInitialProducts(): IProduct[] {
	return [
		{
			name: 'Наименование товара',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			name: 'Наименование товара',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			name: 'Наименование товара',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			name: 'Наименование товара',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
		{
			name: 'Наименование товара',
			desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
			price: 10000,
			imageLink: 'https://i.imgur.com/g6xw8wT.png',
		},
	];
}
