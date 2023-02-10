<script setup lang="ts">
import { ProductCard, Loading } from '@/components';
import { key } from '@/store';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';


const store = useStore(key);
const productsStore = store.state.products


onMounted(async () => {
	
	await store.dispatch('getProducts')

	
})
</script>

<template>
	<Loading />
	<img src="../assets/images/banner-1.jpeg" alt="">


	<div  class="flex p-4 gap-3 flex-wrap justify-center">
		<ProductCard v-for="product in productsStore.products" :product="product" />
	</div>

</template>
