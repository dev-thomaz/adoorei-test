<script setup lang="ts">
import type { ProductState } from '@/store/products-store';
import { useStore } from 'vuex'
import {key} from '../../store'
import { onMounted } from 'vue'
import CartIcon from '../icons/IconCart.vue'
import {ProductCounter, Rating} from '@/components'
const props = defineProps<{
    product: ProductState
}>()

const store = useStore(key);
const cartStore = store.state.cart



function convertCurrency(value: number){
   return value.toLocaleString('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});
}

function test(id: number){
return store.commit('checkHasInCart', id)
}

function checkProductInCart(){
return  store.getters.checkHasInCart(props.product) 
}

function addProductToCart(product:ProductState){
   store.commit('addProduct', product)
}


onMounted( () => {

})
</script>

<template>
    
        <div class="w-60 flex items-center shadow-md rounded-xl overflow-hidden justify-between  bg-white flex-col p-2  hover:shadow-lg">
            <div class="flex justify-center h-30 cursor-pointer">
                <img class="object-scale-down h-48 w-48 " :src="product.image" alt="">
            </div>
            <div class="h-24 self-start pt-5  cursor-pointer">
                <span class="text-md font-medium text-gray">{{product.title}}</span>
            </div>
            <Rating :rating="product.rating"/>
            <div class="mt-10 flex  items-center gap-2">
                <span class="font-bold text-lg text-gray">{{convertCurrency(product.price)}}</span>
                <div class="flex items-center justify-self-end">
                    <span class="pl-5 hover:text-primary cursor-pointer flex gap-1" @click="addProductToCart(product)" v-if="!checkProductInCart()">
                      <CartIcon />  adicionar
                    </span>
                    <ProductCounter v-if="checkProductInCart()" :product="product" />
                    
                </div>
            </div>
        </div>
 
</template>