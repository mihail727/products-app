<script setup lang="ts">
	useHead({
		link: [
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap',
			},
		],
	});

	const emit = defineEmits<{
		(e: 'addProduct', product: IProduct): void;
	}>();

	const { isNotEmpty } = useValidate();

	const productName = ref('');
	const productDesc = ref('');
	const imageLink = ref('');
	const productPrice = ref('');

	const inputNameError = ref(false);
	const inputImageLinkError = ref(false);
	const inputPriceError = ref(false);

	const isAddButtonDisabled = ref(true);

	const onPriceInputKeyUp = (event: Event) => {
		const el = event.currentTarget as HTMLInputElement;
		let value = el.value.split(' ').join('');

		const { formatForView } = usePriceFormat();
		el.value = formatForView(value);
		productPrice.value = el.value;
	};

	const onPriceInputKeyPress = (event: KeyboardEvent) => {
		let char = event.key;
		if (!isNaN(parseInt(char))) {
			(event.currentTarget as HTMLInputElement).value += char;
		}
	};

	const onClickAdd = () => {
		clearErrors();

		if (!isNotEmpty(productName.value)) inputNameError.value = true;
		if (!isNotEmpty(imageLink.value)) inputImageLinkError.value = true;
		if (!isNotEmpty(productPrice.value)) inputPriceError.value = true;

		if (!inputNameError.value && !inputImageLinkError.value && !inputPriceError.value) {
			const { formatForData } = usePriceFormat();
			const newProduct: IProduct = {
				name: productName.value,
				desc: productDesc.value,
				imageLink: imageLink.value,
				price: formatForData(productPrice.value),
			};
			emit('addProduct', newProduct);
			clearAddForm();
		}
	};

	watch([productName, productDesc, imageLink, productPrice], (newValues) => {
		if (newValues.some((value) => isNotEmpty(value))) isAddButtonDisabled.value = false;
		else isAddButtonDisabled.value = true;
	});

	const clearAddForm = () => {
		productName.value = '';
		productDesc.value = '';
		imageLink.value = '';
		productPrice.value = '';
	};

	const clearErrors = () => {
		inputNameError.value = false;
		inputImageLinkError.value = false;
		inputPriceError.value = false;
	};
</script>

<template>
	<div
		class="flex flex-col space-y-[18px] w-full h-full p-[24px] bg-[#FFFEFB] rounded shadow-2xl text-[#49485E] overflow-y-auto transition-all"
	>
		<div class="relative flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">Наименование товара</h3>
			<input
				v-model="productName"
				type="text"
				class="rounded shadow-md h-[36px] placeholder:text-[#B4B4B4] bg-[#FFFEFB] p-[10px_16px] focus:border-none"
				placeholder="Введите наименование товара"
			/>

			<Transition name="error">
				<span
					v-show="inputNameError"
					class="absolute bottom-[-21px] text-[12px] text-red-500"
				>
					Поле является обязательным
				</span>
			</Transition>
		</div>

		<div class="flex flex-col space-y-1">
			<h3 class="text-sm">Описание товара</h3>
			<textarea
				v-model="productDesc"
				class="rounded shadow-md placeholder:text-[#B4B4B4] bg-[#FFFEFB] p-[10px_16px] resize-none"
				placeholder="Введите описание товара"
				cols="30"
				rows="6"
			></textarea>
		</div>

		<div class="relative flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">
				Ссылка на изображение товара
			</h3>
			<input
				v-model="imageLink"
				type="text"
				class="rounded shadow-md h-[36px] bg-[#FFFEFB] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите ссылку"
			/>

			<Transition name="error">
				<span
					v-show="inputImageLinkError"
					class="absolute bottom-[-21px] text-[12px] text-red-500"
				>
					Поле является обязательным
				</span>
			</Transition>
		</div>

		<div class="relative flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">Цена товара</h3>
			<input
				v-model="productPrice"
				@keyup="onPriceInputKeyUp"
				@keypress.prevent="onPriceInputKeyPress"
				type="text"
				class="rounded shadow-md h-[36px] bg-[#FFFEFB] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите цену"
			/>

			<Transition name="error">
				<span
					v-show="inputPriceError"
					class="absolute bottom-[-21px] text-[12px] text-red-500"
				>
					Поле является обязательным
				</span>
			</Transition>
		</div>

		<button
			:disabled="isAddButtonDisabled"
			@click="onClickAdd"
			class="disabled:bg-[#EEEEEE] disabled:text-[#B4B4B4] rounded-lg p-[10px] font-['Inter',_sans-serif]"
		>
			Добавить товар
		</button>
	</div>
</template>

<style scoped>
	.error-enter-active,
	.error-leave-active {
		transition: all 0.8s;
	}

	.error-enter-from,
	.error-leave-to {
		opacity: 0;
	}
</style>
