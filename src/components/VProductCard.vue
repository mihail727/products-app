<script setup lang="ts">
	import { TrashIcon } from '@heroicons/vue/outline/index.js';
	import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

	const breakpoints = useBreakpoints(breakpointsTailwind);
	const md = breakpoints.greater('md');

	defineProps<{
		id: number;
		product: IProduct;
	}>();

	const emit = defineEmits<{
		(e: 'delete', id: number): void;
	}>();

	const isCardHovered = ref(false);
</script>

<template>
	<div
		@mouseenter="isCardHovered = true"
		@mouseleave="isCardHovered = false"
		class="relative flex-shrink flex flex-col justify-between max-w-full md:max-w-[485px] shadow-md hover:shadow-xl rounded active:scale-95 transition-all"
	>
		<img :src="product.imageLink" alt="product-image" />

		<div class="flex-grow flex flex-col justify-between p-[16px]">
			<p class="font-[600] text-[18px] xs:text-[20px] mb-[16px]">{{ product.name }}</p>
			<p class="flex-grow text-[14px] xs:text-[16px] max-h-[43%] mb-[32px] overflow-y-scroll">
				{{ product.desc }}
			</p>
			<p class="text-[20px] xs:text-[24px]">{{ product.price }} руб.</p>
		</div>

		<Transition name="trash">
			<button
				v-show="isCardHovered || !md"
				@click="emit('delete', id)"
				class="absolute right-2 xs:right-5 md:right-[-10px] top-[85%] xxs:top-[87%] md:top-[-10px] bg-red-400 text-white p-[5px] rounded-lg hover:bg-red-500 active:scale-75 transition-all"
			>
				<TrashIcon class="h-[34px] md:h-[26px] stroke-[1]" />
			</button>
		</Transition>
	</div>
</template>

<style scoped>
	.trash-enter-active,
	.trash-leave-active {
		transition: all 0.2s ease;
	}
	.trash-enter-from,
	.trash-leave-to {
		opacity: 0;
	}
</style>
