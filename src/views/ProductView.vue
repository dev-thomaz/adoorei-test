<script setup lang="ts">
import { Rating } from '@/components';
import { key } from '@/store';
import { useStore } from 'vuex';
import {convertCurrency} from '@/helper/helpers'
import {ProductCounter} from '@/components'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useStore(key);
const productState = store.state.products.product
const router = useRouter()
function calcParcel(price: number){
    return price / 10
}


function checkProductInCart() {
    return store.getters.checkHasInCart(productState)
}

function addProductToCart(){
    store.dispatch('addProduct', productState)
}

function handleBuyDirect(){
    router.push('/checkout')
    store.dispatch('addProduct', productState)
}

onMounted(() => {
    document.title =productState.title as string;
})

</script>

<template>
    <div v-if="productState.id"  class="flex p-20 justify-between gap-10  h-screen fixed">
        <div class="bg-white shadow-sm w-3/4 h-3/6 rounded-xl flex items-start px-10 py-2">
            <div class=" w-full h-full flex justify-center items-center">
                <img v-bind:src="productState.image" class="object-scale-down w-72 h-72 " alt="">
            </div>
            <div class="w-full h-full pl-8 flex flex-col justify-between">
                <div>
                    <span class=" text-gray font-medium text-lg">{{productState.title}}</span>
                    <Rating :rating="productState.rating"/>
                </div>
                <div >
                    <span class=" text-gray font-medium text-md">{{productState.description}}</span>

                </div>
                <div>
                    <span class="font-light text-black">Ver mais produtos em </span>
                    <span class="text-primary hover:text-secondary cursor-pointer transition-colors duration-300">{{productState.category}}</span>
                </div>
            </div>

        </div>
        <div  class="bg-white shadow-sm w-1/3 h-2/5 rounded-xl flex flex-col   p-5 justify-between">
            <div>
                <span class="text-3xl font-medium" >{{convertCurrency(productState.price)}}</span>
                <p>ou 10 x de {{convertCurrency(calcParcel(productState.price))}}</p>
            </div>
                
            <div >
                
                <button v-if="!checkProductInCart()" @click="addProductToCart()" class="bg-primary p-3 rounded-md text-white font-medium w-full text-lg mb-2">Adicionar ao carrinho</button>
                <div v-else class="h-12  mb-2">
                    <ProductCounter  :product="productState" />
                </div>
                <button @click="handleBuyDirect()" class="bg-primary p-3 rounded-md text-white font-medium w-full text-lg">comprar</button>
            </div>
        </div>
    </div>
</template>