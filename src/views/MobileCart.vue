<script setup lang="ts">import { key } from '@/store';
import { useStore } from 'vuex';
import { convertCurrency } from '@/helper/helpers'
import CartIcon from '@/components/icons/IconCart.vue'
import SadIcon from '@/components/icons/IconSad.vue'
import { ProductCounter } from '@/components'
import {useRouter} from 'vue-router'
const store = useStore(key);
const cartStore = store.state.cart;
const router = useRouter()
</script>

<template>

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

        <div class="h-5/6 flex flex-col justify-between overflow-y-scroll bg-white">
            <div v-for="product in cartStore.cart.products" class="my-2">

                <div class="flex items-center gap-2 p-2">
                    <div class="w-18">
                        <img v-lazy="product.image" class="object-scale-down h-16 w-16 " alt="">
                    </div>
                    <div class="w-40 whitespace-nowrap text-ellipsis overflow-hidden">
                        <span class="text-md ">
                            {{ product.title }}
                        </span>
                    </div>
                    <ProductCounter :product="product" />

                </div>
                <div class="flex justify-around items-center pb-2">
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
                <button class="bg-primary w-5/6 text-white font-bold h-14 rounded-md">Finalizar pedido</button>
            </div>
        </div>
    </div>
    <div class="flex flox-col text-gray justify-center py-20" v-else >
        <SadIcon class="text-gray" />
        <span class="font-medium"> Oops! Seu carrinho vazio</span>
    </div>

</template>