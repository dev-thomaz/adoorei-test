<script setup lang="ts">
import { Rating } from '@/components';
import { key } from '@/store';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'
import {convertCurrency} from '@/helper/helpers'
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import type { ProductState } from '@/store/products-store';
import {ProductCounter} from '@/components'


const store = useStore(key);
const productState = store.state.products.product
let product = ref< ProductState>({
    title:'', 
    image:'',
    category:'',
    description:'',
    id:0,
    price:0,
    rating:{count:0,rate:0}}) 
// const product = store.state.products.product
const route = useRoute()
function calcParcel(price: number){
    return price / 10
}
watch(product, async (newValue, oldValue) => {
    console.log(newValue, oldValue);
    await store.getters.getProductInfo
})
onBeforeMount(async () => {
    await store.dispatch('getProductById', route.params.id).then((rep) =>{
        console.log('22222', rep);
        console.log(product.value);
        
    })
})

function checkProductInCart() {
    return store.getters.checkHasInCart(productState)
}

function addProductToCart(){
    store.dispatch('addProduct', productState)
}

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
                <button class="bg-primary p-3 rounded-md text-white font-medium w-full text-lg">comprar</button>
            </div>
        </div>
    </div>
</template>