<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from '@/store'
import {ProductCard} from '@/components'
import { onMounted, onUpdated, ref,  } from 'vue';
import { useRoute } from 'vue-router'
import {ArrowUpIcon, ArrowDownIcon } from '@/components/icons'
const store = useStore(key);
const route = useRoute()
const productsStore = store.state.products
const query = ref(route.params.name)
const sortOptions = ['Nome', 'Preço', 'Avaliação']
const sortType = ['asc', 'desc']
const sortSelected = ref('')
const sortTypeSelected = ref ('')
onMounted(async () => {
    document.title = route.params.name as string;
    await store.commit('getProductByCategory', route.params.name)
    
})
onUpdated(async () => {
if(query.value !== route.params.name){
    query.value = route.params.name
    await store.commit('getProductByCategory', route.params.name)
    
}
})
function handleSortType(sort: string){
    sortTypeSelected.value = sort
    const payload = `${sortSelected.value}-${sort}`
    store.dispatch('setSortProductList', payload)
    
}
function handleSortProducts(sort: string){
    if(sortTypeSelected.value === ''){ 
        sortTypeSelected.value = 'asc'
    }
    if(sortSelected.value === sort){
        sortSelected.value = ''
      return   store.dispatch('setSortProductList', 'clear')
    }
    sortSelected.value = sort
    const payload = `${sort}-${sortTypeSelected.value}`
   
    
    store.dispatch('setSortProductList', payload)
}


</script>

<template>
    <div class=" flex justify-between items-center p-5">
        <h2 class="text-2xl font-medium underline">{{ route.params.name }}</h2>
        <div class="flex items-center gap-2">
            <span>Ordenar por: </span>
            <div class="bg-primary flex justify-between overflow-hidden rounded-2xl w-80  items-center divide-x divide-secondary">
                <div v-for="sortOption in sortOptions" class="w-1/3 flex justify-center">
                    <button @click="handleSortProducts(sortOption)" :class="{'bg-secondary':sortSelected === sortOption }"  class="text-white text-lg font-medium h-full w-full">{{sortOption}}</button>
                </div>
            </div>
            <div v-if="sortSelected !== ''" class="bg-primary flex justify-between overflow-hidden rounded-2xl w-40  items-center divide-x divide-secondary">
                <div  class="w-1/2 flex justify-center">
                    <button @click="handleSortType('asc')" :class="{'bg-secondary':sortTypeSelected === 'asc' }"  class="text-white text-lg font-lg h-full w-full flex justify-center "> <ArrowUpIcon class="text-white"/> </button>
                </div>
                <div  class="w-1/2 flex justify-center">
                    <button @click="handleSortType('desc')" :class="{'bg-secondary':sortTypeSelected === 'desc' }"  class="text-white text-lg font-lg h-full w-full flex justify-center"> <ArrowDownIcon class="text-white" /> </button>
                </div>
            </div>
        </div>
    </div>

    <div  class="flex p-4 gap-3 flex-wrap justify-center">
		<ProductCard v-for="product in productsStore.products" :product="product" />
	</div>

    
</template>