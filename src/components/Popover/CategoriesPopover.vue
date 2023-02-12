<script setup lang="ts">
import {  ref } from 'vue';
import { useStore } from 'vuex'
import { key } from '@/store'
import MenuIcon from '@/components/icons/IconMenu.vue'

const store = useStore(key);
const categoriesStore = store.state.categories
const isOpen = ref(false)

</script>

<template>
    <div class=" relative" @mouseover="isOpen = true" @mouseleave="isOpen = false">

        <MenuIcon  class="text-white"/>

        <div v-show="isOpen" class="bg-white  text-black rounded-r-lg absolute top-6 w-52 shadow-md z-10 -left-5 p-3 transition-opacity" >
            <div class="text-gray  flex flex-col">
               <span>Selecione uma categoria </span>  
                <RouterLink to="/"  @click="isOpen = false" class="text-xl font-bold cursor-pointer hover:text-secondary hover:font-bold hover:animate-pulse transition-colors duration-500 my-2">
                    Home
               </RouterLink>
                <RouterLink  :to="'/categoria/' + category.name"  @click="isOpen = false" v-for="category  in categoriesStore.categories"
                    class="text-xl font-bold cursor-pointer hover:text-secondary hover:font-bold hover:animate-pulse transition-colors duration-500 my-2">
                    {{ category.name }}
                </RouterLink>
    
            </div>
        </div>
    </div>
</template>