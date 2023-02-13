<script setup lang="ts">import { key } from '@/store';
import { useStore } from 'vuex';
import { convertCurrency } from '@/helper/helpers'
import { CartIcon } from '@/components/icons'
import SadIcon from '@/components/icons/IconSad.vue'
import { ProductCounter } from '@/components'
import { useRouter } from 'vue-router'
import type { ProductState } from '@/store/products-store';
const store = useStore(key);
const cartStore = store.state.cart;
const router = useRouter()

function handleProductDetail(product: ProductState) {
    store.dispatch('setProductDetail', product).then(() => {
        router.push(`/mobile-product/${product.id}`)
    })
}
</script>

<template>
    <div class="fixed w-full">
        <div class="flex items-center justify-between p-3 bg-primary text-white">
            <div class="flex gap-5 items-center">
                <CartIcon />
                <span class="text-lg font-medium "> Seu Carrinho</span>
            </div>
            <div>
                <span> </span>
                <span @click="router.go(-1)">voltar</span>
            </div>
        </div>
        <div v-if="cartStore.cart.products.length" class="bg-white h-screen flex flex-col">

            <div class=" flex flex-col gap-2 overflow-y-scroll h-3/5 bg-white">
                <div v-for="product in cartStore.cart.products" class=" gap-0 flex flex-col justify-start">

                    <div class="flex items-center gap-2 p-2">
                        <div @click="handleProductDetail(product)" class="w-18">
                            <img v-lazy="product.image" class="object-scale-down h-16 w-16 " alt="">
                        </div>
                        <div class="w-2/3 flex justify-start   overflow-hidden">
                            <span class="text-md text-ellipsis">
                                {{ product.title }}
                            </span>
                        </div>
                        <div class="w-1/3 h-8">
                            <ProductCounter :product="product" />
                        </div>

                    </div>
                    <div class="flex justify-around items-center ">
                        <span class="text-sm ">
                            {{ product.count }} x {{ convertCurrency(product.price) }} = {{
                                convertCurrency(product.amount)
                            }}
                        </span>

                    </div>
                </div>
            </div>

            <div class=" flex  flex-col justify-self-end">
                <div class="flex justify-between my-5 p-2">
                    <span>Valor do carrinho: </span>
                    <span> {{ convertCurrency(cartStore.cart.amount) }}</span>
                </div>
                <div class="flex justify-center">
                    <button @click="router.push('/mobile-checkout')" class="bg-primary w-5/6 text-white font-bold h-14 rounded-md">Finalizar pedido</button>
                </div>
            </div>
        </div>
        <div class="flex flox-col text-gray justify-center py-20" v-else>
            <SadIcon class="text-gray" />
            <span class="font-medium"> Oops! Seu carrinho vazio</span>
        </div>
    </div>
</template>