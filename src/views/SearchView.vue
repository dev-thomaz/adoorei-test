<script setup lang="ts">
import { ProductCard, Loading } from '@/components';
import { key } from '@/store';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'

const store = useStore(key);
const productsStore = store.state.products
const route = useRoute()

onMounted(async () => {
	console.log(route.params.query);
    
	await store.dispatch('getProducts')

	
})
</script>

<template>
	<Loading />
<div class="p-5 text-xl">
    <span class="font-medium underline">Resultado da busca {{route.params.query}}</span>
</div>
	<div  class="flex p-4 gap-3 flex-wrap justify-center">
		<ProductCard v-for="product in productsStore.products" :product="product" />
	</div>

</template>