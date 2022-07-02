<script setup lang="ts">
	if (process.client) {
		useProduct().setup();
	}
</script>

<template>
	<Head>
		<Link rel="preconnect" href="https://fonts.googleapis.com" />
		<Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
		<Link
			href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap"
			rel="stylesheet"
		/>
	</Head>

	<div
		class="min-h-screen min-w-screen bg-[rgba(255,254,251,0.8)] font-['Source_Sans_Pro',_sans-serif] overflow-x-hidden"
	>
		<NuxtPage />
	</div>
</template>

<style>
	::-webkit-scrollbar {
		background-color: transparent;
		width: 7px;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb {
		background-color: #eeeeee;
		border-radius: 10px;
	}
</style>
