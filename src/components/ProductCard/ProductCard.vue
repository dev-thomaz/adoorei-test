<script setup lang="ts">
import type { ProductState } from '@/store/products-store';
import { useStore } from 'vuex'
import { key } from '../../store'
import { CartIcon } from '@/components/icons'
import { ProductCounter, Rating } from '@/components'
import { convertCurrency } from '@/helper/helpers'
import { useRouter, RouterLink } from 'vue-router'

const props = defineProps<{
    product: ProductState
}>()
const router = useRouter()
const innerWidth = window.innerWidth
const store = useStore(key);

function checkProductInCart() {
    return store.getters.checkHasInCart(props.product)
}

function addProductToCart(product: ProductState) {
    store.dispatch('addProduct', product)
}

function handleProductDetail() {
    store.dispatch('setProductDetail', props.product).then(() => {
        router.push(`/product/${props.product.id}`)
    })
}

</script>

<template>
    <div class="cursor-pointer w-80 flex items-center shadow-md rounded-xl overflow-hidden justify-between  bg-white flex-col p-2  hover:shadow-lg"
        v-if="innerWidth > 512">
        <div @click="handleProductDetail()" class="flex flex-col justify-center w-full">
            <div class="flex justify-center  cursor-pointer">
                <img v-lazy="product.image" class="object-scale-down h-48 w-48 " alt="">
            </div>
            <div class="h-24 self-start pt-5  cursor-pointer">
                <span class="text-md font-medium text-gray">{{ product.title }}</span>
            </div>
            <Rating v-if="product.rating" :rating="product.rating" />

        </div>

        <div class="my-5 flex items-center justify-between  w-full">
            <span v-if="product.price" class="font-bold text-lg text-gray w-1/3 flex justify-center">{{ convertCurrency(product.price) }}</span>
            <div class="flex items-center w-2/3 justify-center">
                <span class="hover:text-primary cursor-pointer flex gap-1" @click="addProductToCart(product)"
                    v-if="!checkProductInCart()">
                    <CartIcon /> adicionar
                </span>
                <div v-else class="w-full h-7">
                    <ProductCounter :product="product" />
                </div>
            </div>

        </div>

    </div>

    <div v-else>
        <div
            class="w-40 flex items-center shadow-md rounded-xl overflow-hidden justify-between  bg-white flex-col p-2  hover:shadow-lg">
            <div class="flex justify-center h-30 cursor-pointer">
                <img v-lazy="product.image" class="object-scale-down h-24 w-24 " alt="">
            </div>
            <div class="max-h-12 self-start pt-2  cursor-pointer text-ellipsis overflow-hidden">
                <span class="text-sm font-medium text-gray text-ellipsis">{{ product.title }}</span>
            </div>
            <Rating :rating="product.rating" />
            <div class=" flex flex-col  items-center justify-center gap-2">
                <span class="font-bold text-sm text-gray">{{ convertCurrency(product.price) }}</span>
                <div class="flex flex-col items-center justify-self-end">
                    <span class="pl-2 hover:text-primary cursor-pointer text-sm flex gap-1"
                        @click="addProductToCart(product)" v-if="!checkProductInCart()">
                        <CartIcon /> adicionar
                    </span>
                    <ProductCounter v-if="checkProductInCart()" :product="product" />

                </div>
            </div>
        </div>
    </div>


</template>