<script setup lang="ts">
	import { PlusIcon, XIcon, CodeIcon, PhotographIcon } from '@heroicons/vue/outline/index.js';
	import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
	import { SortTypes } from '../types';

	const breakpoints = useBreakpoints(breakpointsTailwind);
	const lg = breakpoints.greater('lg');

	const isProductAddFormOpened = ref(false);
	const productList = ref<IProduct[]>([]);

	const { add, removeById, load, pending } = useProduct();

	const onAddProduct = (newProduct: IProduct) => {
		productList.value = add(newProduct);
		isProductAddFormOpened.value = false;
	};

	const onRemoveProduct = (id: number) => {
		productList.value = removeById(id);
	};

	onMounted(async () => {
		productList.value = await load();
	});

	const onSortSelected = (sortType: SortTypes) => {
		productList.value = useArraySort().factory(sortType, productList.value);
	};
</script>

<template>
	<div class="relative flex min-h-screen w-screen p-[20px] lg:p-[32px] lg:space-x-6">
		<TransitionGroup name="product-add-form">
			<div
				v-if="lg || isProductAddFormOpened"
				class="fixed top-0 right-0 left-0 sm:left-auto sm:top-auto sm:bottom-[90px] sm:right-[90px] lg:sticky lg:top-[32px] h-screen sm:h-fit lg:h-full flex flex-grow-0 flex-col lg:space-y-[16px] z-10"
			>
				<h2 v-show="lg" class="text-[28px] text-[#3F3F3F] font-[600]">Добавление товара</h2>

				<VProductAddForm @add-product="onAddProduct" :is-disabled="pending" />
			</div>
		</TransitionGroup>

		<div class="flex flex-col space-y-[16px] w-full">
			<VSortButton @select="onSortSelected" :is-disabled="pending" />

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

			<ClientOnly>
				<TransitionGroup
					v-show="productList.length > 0"
					name="product-list"
					tag="div"
					class="relative grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-4 place-items-center items-stretch"
				>
					<VProductCard
						v-for="(product, id) in productList"
						:key="product"
						:product="product"
						:id="id"
						@delete="onRemoveProduct(id)"
					/>
				</TransitionGroup>

				<div
					v-show="productList.length == 0 && !pending"
					class="flex flex-col justify-center items-center h-full shadow-md rounded text-[#a1a1a1]"
				>
					<CodeIcon class="w-16" />
					<span class="text-2xl">Товары отсутствуют</span>
				</div>
			</ClientOnly>

			<div
				v-show="pending"
				class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-4 place-items-center items-stretch"
			>
				<div
					v-for="i in 3"
					class="flex flex-col justify-between w-full min-h-[400px] max-h-[471px] max-w-[682px] md:max-w-[485px] bg-[#EEEEEE] shadow-md rounded animate-pulse"
				>
					<div
						class="flex-shrink-0 flex justify-center items-center rounded-t bg-[#a1a1a1]/30 w-full h-[65%] aspect-[485/292]"
					>
						<PhotographIcon class="h-32 stroke-1 text-[#a7a6a6]" />
					</div>
					<div class="flex-grow flex flex-col justify-between p-[16px]">
						<div class="bg-[#a1a1a1]/50 w-[70%] h-[17px] rounded mb-[16px]"></div>
						<div class="bg-[#a1a1a1]/50 w-full h-[40px] rounded mb-[5%]"></div>
						<div class="bg-[#a1a1a1]/50 w-[50%] h-[17px] rounded"></div>
					</div>
				</div>
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
