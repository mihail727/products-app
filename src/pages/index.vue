<script setup lang="ts">
	const { productList, removeById } = useProduct();
</script>

<template>
	<div class="relative flex min-h-screen p-[32px] space-x-6">
		<div class="sticky top-[32px] h-full flex flex-grow-0 flex-col space-y-[16px]">
			<h2 class="text-[28px] text-[#3F3F3F] font-[600]">Добавление товара</h2>
			<VProductAddForm />
		</div>

		<div class="flex flex-col space-y-[16px]">
			<button class="self-end p-[10px_16px] text-[#B4B4B4] rounded-md shadow-md">
				По умолчанию
			</button>

			<TransitionGroup
				name="product-list"
				tag="div"
				class="relative grid grid-cols-3 gap-x-4 gap-y-6"
			>
				<VProductCard
					v-for="(product, id) in productList"
					:key="product"
					:product="product"
					:id="id"
					@delete="removeById(id)"
				/>
			</TransitionGroup>
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
</style>
