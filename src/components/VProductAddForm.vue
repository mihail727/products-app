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

	const productName = ref('');
	const productDesc = ref('');
	const imageLink = ref('');
	const productPrice = ref<string>();

	const onPriceInputKeyUp = (event: Event) => {
		const el = event.currentTarget as HTMLInputElement;
		let value = el.value.split(' ').join('');
		el.value = usePriceFormat(value);
	};
</script>

<template>
	<div
		class="flex flex-col space-y-[16px] w-full h-full p-[24px] bg-[#FFFEFB] rounded shadow-2xl text-[#49485E]"
	>
		<div class="flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">Наименование товара</h3>
			<input
				v-model="productName"
				type="text"
				class="rounded shadow-md h-[36px] placeholder:text-[#B4B4B4] bg-[#FFFEFB] p-[10px_16px] focus:border-none"
				placeholder="Введите наименование товара"
			/>
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

		<div class="flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">
				Ссылка на изображение товара
			</h3>
			<input
				v-model="imageLink"
				type="text"
				class="rounded shadow-md h-[36px] bg-[#FFFEFB] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите ссылку"
			/>
		</div>

		<div class="flex flex-col space-y-1">
			<h3 class="text-sm after:content-['*'] after:text-[#FF8484]">Цена товара</h3>
			<input
				v-model="productPrice"
				@keyup="onPriceInputKeyUp"
				type="text"
				class="rounded shadow-md h-[36px] bg-[#FFFEFB] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите цену"
			/>
		</div>

		<button
			disabled
			class="disabled:bg-[#EEEEEE] disabled:text-[#B4B4B4] rounded-lg p-[10px] font-['Inter',_sans-serif]"
		>
			Добавить товар
		</button>
	</div>
</template>
