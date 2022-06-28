<script setup></script>

<template>
	<div
		class="flex flex-col space-y-[16px] w-[332px] p-[24px] bg-[#FFFEFB] rounded shadow-xl text-[#49485E]"
	>
		<div class="flex flex-col space-y-1">
			<h3 class="text-[10px] after:content-['*'] after:text-[#FF8484]">
				Наименование товара
			</h3>
			<input
				type="text"
				class="rounded shadow-md text-[12px] h-[36px] placeholder:text-[#B4B4B4] p-[10px_16px] focus:border-none"
				placeholder="Введите наименование товара"
			/>
		</div>

		<div class="flex flex-col space-y-1">
			<h3 class="text-[10px]">Описание товара</h3>
			<textarea
				class="rounded shadow-md text-[12px] placeholder:text-[#B4B4B4] p-[10px_16px] resize-none"
				placeholder="Введите описание товара"
				cols="30"
				rows="6"
			></textarea>
		</div>

		<div class="flex flex-col space-y-1">
			<h3 class="text-[10px] after:content-['*'] after:text-[#FF8484]">
				Ссылка на изображение товара
			</h3>
			<input
				type="text"
				class="rounded shadow-md text-[12px] h-[36px] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите ссылку"
			/>
		</div>

		<div class="flex flex-col space-y-1">
			<h3 class="text-[10px] after:content-['*'] after:text-[#FF8484]">Цена товара</h3>
			<input
				type="text"
				class="rounded shadow-md text-[12px] h-[36px] placeholder:text-[#B4B4B4] p-[10px_16px]"
				placeholder="Введите цену"
			/>
		</div>

		<button
			disabled
			class="disabled:bg-[#EEEEEE] disabled:text-[#B4B4B4] rounded-lg p-[10px] text-[12px]"
		>
			Добавить товар
		</button>
	</div>
</template>
