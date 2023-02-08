<script setup lang="ts">import type { ProductState } from '@/store/products-store';
import { useStore } from 'vuex'
import {key} from '../../store'
import TrashIcon from '../icons/IconTrash.vue'
const props = defineProps<{
    product: ProductState
}>()
const store = useStore(key);
function getProductQtd(){
   return  store.getters.getProductCount(props.product)
}
</script>

<template>
<div class="flex items-center rounded-md overflow-hidden gap-4 cursor-pointer shadow-md">
    <button @click="store.commit('decreaseProductQtd', product)" class="bg-danger w-8 text-xl text-white hover:bg-danger_dark flex justify-center"> 
        <TrashIcon v-if="getProductQtd() === 1" class="icon"/> 
        <span v-else>-</span>
    </button>
    <div>{{getProductQtd()}}</div>
    <button  @click="store.commit('incrementProductQtd', product)" class="bg-positive w-8 text-xl text-white hover:bg-positive_dark">+</button>
</div>

</template>