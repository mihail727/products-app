<script setup lang="ts">
	import { TrashIcon } from '@heroicons/vue/outline/index.js';

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
		class="relative flex-shrink flex flex-col max-w-[485px] shadow-md hover:shadow-xl rounded active:scale-95 transition-all"
	>
		<img :src="product.imageLink" alt="product-image" />

		<div class="flex-grow flex flex-col p-[16px]">
			<p class="font-[600] text-[20px] mb-[16px]">{{ product.name }}</p>
			<p class="flex-grow text-[16px] mb-[32px]">
				{{ product.desc }}
			</p>
			<p class="text-[24px]">{{ product.price }} руб.</p>
		</div>

		<Transition name="trash">
			<button
				v-show="isCardHovered"
				@click="emit('delete', id)"
				class="absolute right-[-10px] top-[-10px] bg-red-400 text-white p-[5px] rounded-lg hover:bg-red-500 active:scale-75 transition-all"
			>
				<TrashIcon class="h-[26px] stroke-[1]" />
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
