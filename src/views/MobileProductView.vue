<script setup lang="ts">
import { Rating } from '@/components';
import { key } from '@/store';
import { useStore } from 'vuex';
import {convertCurrency} from '@/helper/helpers'
import {ProductCounter} from '@/components'
import {useRouter} from 'vue-router'


const store = useStore(key);
const productState = store.state.products.product
const router = useRouter()
function calcParcel(price: number){
    return parseFloat ((price / 10).toFixed(3))
}


function checkProductInCart() {
    return store.getters.checkHasInCart(productState)
}

function addProductToCart(){
    store.dispatch('addProduct', productState)
}

function handleBuyDirect(){
    router.push('/mobile-checkout')
    store.dispatch('addProduct', productState)
}
</script>

<template>
<div class="w-full h-screen flex flex-col items-center  p-5 gap-3">
    <img class="object-scale-down w-52 h-52" :src="productState.image" alt="">
    <div class=" h-20">
        <span>{{productState.title}}</span>
    </div>
    <div class="flex items-start justify-around w-full">
        <Rating :rating="productState.rating"/>
        <div class="flex flex-col justify-center items-center">
            <span class="text-lg font-bold">{{convertCurrency(productState.price)}}</span>
            <span class="text-sm"> 10 x de {{convertCurrency(calcParcel(productState.price))}}</span>
        </div>
    </div>
    <div class="h-36 ">
        <span class="text-gray font-medium">{{productState.description}}</span>
    </div>
    <div class="w-full mt-8">
                
        <button v-if="!checkProductInCart()" @click="addProductToCart()" class="bg-primary p-3 rounded-md text-white font-medium w-full text-lg mb-2">Adicionar ao carrinho</button>
        <div v-else class="h-12  mb-2">
            <ProductCounter  :product="productState" />
        </div>
        <button @click="handleBuyDirect()" class="bg-primary p-3 rounded-md text-white font-medium w-full text-lg">comprar</button>
    </div>
    
</div>

</template>