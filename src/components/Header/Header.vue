<script setup lang="ts">
import { onMounted } from 'vue'
import CartIcon from '../icons/IconCart.vue'
import { useStore } from 'vuex'
import {key} from '../../store'


const store = useStore(key);

const cartStore = store.state.cart
const categoriesStore = store.state.categories
const productsStore = store.state.products
function testAddProductToCart(){
   store.commit('addProduct')
}

onMounted(async () => {
  await store.commit("getCategories")
    
})
</script>


<template>
    <header class="bg-primary flex p-6 justify-between">
        <div class="text-white" >
            <span class="font-bold text-lg"> MyStore </span>
        </div>
        <input type="text" placeholder="Buscar produto" class="rounded-md pl-5 h-10 w-6/12">
        <button @click="testAddProductToCart" class=" text-white flex">
           
              <CartIcon class="icon"/>
              
              <div v-if="cartStore.cart_count > 0" class="bg-secondary rounded-xl w-5 h-5 flex justify-center items-center absolute left-3 top-2 text-sm">
                <span>{{cartStore.cart_count}}</span>
                </div>
            </button>
    </header>
    <div class="bg-primary shadow-md p-3 flex justify-around ">
        
        <span v-for="category  in categoriesStore.categories" class="text-white text-lg cursor-pointer">{{category.name}}</span>
        <!-- <span class="text-black text-lg">jewelery</span>
        <span class="text-black text-lg">men's clothing</span>
        <span class="text-black text-lg">women's clothing</span> -->
    </div>
</template>

<style scoped>



</style>
