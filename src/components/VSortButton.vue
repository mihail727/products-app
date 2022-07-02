<script setup lang="ts">
	import { ChevronDownIcon } from '@heroicons/vue/outline/index.js';
	import { SortTypes } from '../types';

	const emit = defineEmits<{
		(e: 'select', sortType: SortTypes): void;
	}>();

	defineProps<{
		isDisabled: boolean;
	}>();

	const sortTypes: SortTypes[] = ['По умолчанию', 'Наименование', 'Макс. цена', 'Мин. цена'];
	const selectedSortType = ref<SortTypes>('По умолчанию');

	const isDropDownOpened = ref(false);
	const DropDownSortEl = ref<HTMLElement>(null);

	onClickOutside(DropDownSortEl, () => {
		isDropDownOpened.value = false;
	});

	const onSortClick = (sortType: SortTypes) => {
		selectedSortType.value = sortType;
		emit('select', sortType);
		isDropDownOpened.value = false;
	};
</script>

<template>
	<div ref="DropDownSortEl" class="relative self-end flex flex-col">
		<button
			:disabled="isDisabled"
			@click="isDropDownOpened = !isDropDownOpened"
			class="flex flex-nowrap space-x-1 items-center justify-center w-[165px] p-[10px_16px] text-[#B4B4B4] shadow-md transition-all z-[9]"
			:class="{
				'rounded-t-md': isDropDownOpened,
				'rounded-md': !isDropDownOpened,
				'hover:shadow-xl': !isDisabled,
			}"
		>
			<span>{{ selectedSortType }}</span>

			<ChevronDownIcon
				class="mt-1 w-6 transition-all"
				:class="{ 'rotate-180': isDropDownOpened }"
			/>
		</button>

		<Transition>
			<div
				v-show="isDropDownOpened"
				class="absolute top-[50px] flex flex-col w-full rounded-b-md bg-white/70 backdrop-blur-sm shadow-md z-[8]"
			>
				<button
					v-for="el in sortTypes"
					@click="onSortClick(el)"
					class="w-full text-left p-[10px] border-b-[1px] hover:border-[#7BAE73] rounded-b transition-all"
				>
					{{ el }}
				</button>
			</div>
		</Transition>
	</div>
</template>

<style scoped>
	.v-enter-active,
	.v-leave-active {
		transition: all 0.5s;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
		transform: translateY(-30px);
	}
</style>
