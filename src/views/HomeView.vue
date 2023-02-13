<script setup lang="ts">
import { ProductCard } from '@/components';
import { key } from '@/store';
import { onMounted } from 'vue';
import { useStore } from 'vuex';


const store = useStore(key);
const productsStore = store.state.products
const innerWidth = window.innerWidth

onMounted(async () => {
	document.title = 'MyStore';
	await store.dispatch('getProducts')
	
	
})
</script>

<template>
	<div v-if="innerWidth > 512" class="flex justify-center">
		<img src="../assets/images/banner-1.jpeg" class="w-3/5 p-5">
	</div>
	<div v-else class="flex justify-center">
		<img src="../assets/images/banner-1.jpeg" class="w-full p-5">
	</div>


	<div  class="flex p-2 gap-5 flex-wrap justify-center">
		<div v-for="(product) in productsStore.products">
			<ProductCard :product="product" />
		</div>
	</div>

</template>
