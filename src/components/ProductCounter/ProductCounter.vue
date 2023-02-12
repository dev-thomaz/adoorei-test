<script setup lang="ts">import type { ProductState } from '@/store/products-store';
import { useStore } from 'vuex'
import {key} from '../../store'
import TrashIcon from '../icons/IconTrash.vue'
const props = defineProps<{
    product: ProductState
}>()
const store = useStore(key);
const innerWidth = window.innerWidth

function getProductQtd(){
   return  store.getters.getProductCount(props.product)
}
</script>

<template>
<div v-if="innerWidth > 512" class="flex items-center rounded-md overflow-hidden h-full cursor-pointer shadow-md">
    <button @click="store.dispatch('decreaseProductQtd', product)" class="bg-danger w-1/3 text-xl h-full  text-white hover:bg-danger_dark flex justify-center items-center"> 
        <TrashIcon v-if="getProductQtd() === 1" class="icon"/> 
        <span v-else>-</span>
    </button>
    <div class="w-1/3 flex justify-center">{{getProductQtd()}}</div>
    <button  @click="store.dispatch('incrementProductQtd', product)" class="bg-positive w-1/3 text-xl h-full text-white hover:bg-positive_dark">+</button>
</div>
<div v-else  class="flex items-center rounded-md overflow-hidden w-full h-full cursor-pointer shadow-md">
    <button @click="store.dispatch('decreaseProductQtd', product)" class="bg-danger w-1/3 h-full text-xl text-white hover:bg-danger_dark flex items-center justify-center"> 
        <TrashIcon v-if="getProductQtd() === 1" class="icon"/> 
        <span v-else>-</span>
    </button>
    <div class="w-1/3 flex justify-center h-full items-center">{{getProductQtd()}}</div>
    <button  @click="store.dispatch('incrementProductQtd', product)" class="bg-positive w-1/3 h-full font-bold justify-center items-center text-xl text-white hover:bg-positive_dark">+</button>
</div>

</template>