<script setup lang="ts">
	import { PlusIcon, XIcon, CodeIcon } from '@heroicons/vue/outline/index.js';
	import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

	const breakpoints = useBreakpoints(breakpointsTailwind);
	const lg = breakpoints.greater('lg');

	const isProductAddFormOpened = ref(false);

	const { productList, removeById } = useProduct();

	const onAddProduct = (newProduct: IProduct) => {
		productList.value.splice(0, 0, newProduct);
		isProductAddFormOpened.value = false;
	};
</script>

<template>
	<div class="relative flex min-h-screen w-screen p-[20px] lg:p-[32px] lg:space-x-6">
		<div
			class="fixed right-0 left-0 sm:left-auto sm:top-auto sm:bottom-[90px] sm:right-[90px] lg:sticky lg:top-[32px] h-screen sm:h-fit lg:h-full flex flex-grow-0 flex-col space-y-[16px] z-10"
		>
			<h2 v-if="lg" class="text-[28px] text-[#3F3F3F] font-[600]">Добавление товара</h2>

			<Transition name="product-add-form">
				<VProductAddForm v-if="isProductAddFormOpened || lg" @add-product="onAddProduct" />
			</Transition>
		</div>

		<div class="flex flex-col space-y-[16px] w-full">
			<button class="self-end p-[10px_16px] text-[#B4B4B4] rounded-md shadow-md">
				По умолчанию
			</button>

			<TransitionGroup v-if="!lg" name="add-form-button">
				<PlusIcon
					v-if="!lg && !isProductAddFormOpened"
					@click="isProductAddFormOpened = true"
					class="fixed bottom-5 2xs:bottom-10 right-3 2xs:right-7 h-14 2xs:h-16 stroke-1 bg-[#a1a1a1]/70 text-green-400 rounded-full p-3 hover:bg-[#a1a1a1] active:scale-75 z-10 transition-all"
				/>
				<XIcon
					v-if="!lg && isProductAddFormOpened"
					@click="isProductAddFormOpened = false"
					class="fixed bottom-5 2xs:bottom-10 right-3 2xs:right-7 h-14 2xs:h-16 stroke-1 bg-[#a1a1a1]/70 text-red-400 rounded-full p-3 hover:bg-[#a1a1a1] active:scale-75 z-10 transition-all"
				/>
			</TransitionGroup>

			<!-- TODO: не может прочитать length -->
			<TransitionGroup
				v-if="productList?.length > 0"
				name="product-list"
				tag="div"
				class="relative grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-4 place-items-center items-stretch"
			>
				<VProductCard
					v-for="(product, id) in productList"
					:key="product"
					:product="product"
					:id="id"
					@delete="removeById(id)"
				/>
			</TransitionGroup>

			<div
				v-else
				class="flex flex-col justify-center items-center h-full shadow-md rounded text-[#a1a1a1]"
			>
				<CodeIcon class="w-16" />
				<span class="text-2xl">Товары отсутствуют</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.product-list-enter-active,
	.product-list-leave-active,
	.product-list-move {
		transition: all 0.6s;
	}

	.product-list-leave-active {
		position: absolute;
	}

	.product-list-enter-from,
	.product-list-leave-to {
		opacity: 0;
		transform: scale(0.8) translate(0, -200px);
	}

	.add-form-button-enter-active,
	.add-form-button-leave-active {
		transition: all 0.6s;
	}

	.add-form-button-enter-from,
	.add-form-button-leave-to {
		opacity: 0;
		transform: scale(0.7);
	}

	.product-add-form-enter-active,
	.product-add-form-leave-active {
		transition: all 0.6s;
	}

	.product-add-form-enter-from,
	.product-add-form-leave-to {
		opacity: 0;
		transform: scale(0.4) translate(400px, 600px);
	}
</style>
