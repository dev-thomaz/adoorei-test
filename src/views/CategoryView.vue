<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from '@/store'
import {ProductCard} from '@/components'
import { onMounted, onUpdated, ref,  } from 'vue';
import { useRoute } from 'vue-router'
const store = useStore(key);
const route = useRoute()
const productsStore = store.state.products
const query = ref(route.params.name)

onMounted(async () => {
    document.title = route.params.name as string;
    await store.commit('getProductByCategory', route.params.name)
    console.log(productsStore);
    
})
onUpdated(async () => {
if(query.value !== route.params.name){
    query.value = route.params.name
    await store.commit('getProductByCategory', route.params.name)
    
}

    
})


</script>

<template>
    <h2 class="text-2xl font-medium p-5 underline">{{ route.params.name }}</h2>
   
    <div  class="flex p-4 gap-3 flex-wrap justify-center">
		<ProductCard v-for="product in productsStore.products" :product="product" />
	</div>
</template>