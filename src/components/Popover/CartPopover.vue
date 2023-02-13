<script setup lang="ts">
import {CartIcon} from '@/components/icons'
import SadIcon from '../icons/IconSad.vue'
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import { key } from '@/store'
import { convertCurrency } from '@/helper/helpers'
import { ProductCounter } from '@/components'
import { useRouter } from 'vue-router';
import type { ProductState } from '@/store/products-store';
const store = useStore(key);
const cartStore = store.state.cart
const isOpen = ref(false)
const innerWidth = window.innerWidth
const router = useRouter()

function handlePopOver(value: boolean) {
    isOpen.value = value
    innerWidth < 512 && router.push('/mobile-cart')
}
function handleProductDetail(product: ProductState) {
    store.dispatch('setProductDetail', product).then(() => {
        router.push(`/product/${product.id}`)
        isOpen.value = false
    })
}

function handleCheckout(){
    router.push('/checkout/')
    isOpen.value = false
}
</script>

<template>
    <div class=" relative" @mouseover="handlePopOver(true)" @mouseleave="handlePopOver(false)">

        <CartIcon class="icon text-white" />
        <div v-if="cartStore.cart.cart_count > 0"
            class="bg-secondary rounded-xl w-5 h-5 flex justify-center items-center absolute left-3 top-2 text-sm">
            <span>{{ cartStore.cart.cart_count }}</span>
        </div>

        <div v-if="innerWidth > 512" v-show="isOpen" class="bg-white text-black rounded-lg absolute top-4 w-80 z-10 right-2 p-2">
            <div v-if="cartStore.cart.products.length" class="h-80 overflow-y-scroll gap-5  p-2">

                <div  v-for="product in cartStore.cart.products" class="">

                    <div class="flex items-center gap-2">
                        <div @click="handleProductDetail(product)" class="w-18 ">
                            <img v-lazy="product.image" class="object-scale-down h-16 w-16 " alt="">
                        </div>
                        <div class=" w-28 text-ellipsis overflow-hidden">
                            <span class="text-sm whitespace-nowrap text-ellipsis">
                                {{ product.title }}
                            </span>
                        </div>
                        <div class="w-1/3">
                            <ProductCounter :product="product" />
                        </div>

                    </div>
                    <div class="flex justify-around items-center">
                        <span class="text-sm ">
                            {{ product.count }} x {{ convertCurrency(product.price) }} = {{
                                convertCurrency(product.amount)
                            }}
                        </span>

                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center  h-20" v-else>
                <SadIcon class="text-gray"/>
                <span>oops! seu carrinho está vazio!</span>
            </div>
            <div v-show="cartStore.cart.products.length">
                <div class="flex justify-between p-6">
                    <span>Valor do carrinho: </span>
                    <span> {{ convertCurrency(cartStore.cart.amount) }}</span>
                </div>
                <div>
                    <button @click="handleCheckout()" class="bg-primary w-full text-white font-bold h-10 rounded-md">Finalizar pedido</button>
                </div>
            </div>
        </div>

    </div>
</template>