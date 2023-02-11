<script setup lang="ts">
import { onMounted } from 'vue'
import { SearchInput, CartPopover, CategoriesPopover } from '@/components'
import { RouterLink } from 'vue-router'
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key);
const categoriesStore = store.state.categories
const innerWidth = window.innerWidth


onMounted(async () => {
    await store.getters.initiCart
    await store.dispatch('getCategories')
    
})
</script>


<template>
    <header v-if="innerWidth > 512" class="bg-primary flex pt-4 pl-10 pr-10  justify-between items-center">
   
        <div class="text-white">
            <RouterLink to="/" >
                <img  src="@/assets/images/logo.png" class="w-20 h-20 cursor-pointer">
            </RouterLink>
            
        </div>

        <SearchInput class="w-8/12" v-if="innerWidth > 512" />
       
            <CartPopover />
          
    </header>
    <header v-else class="bg-primary flex py-4 pl-5 pr-5  justify-between items-center">
   <div>
   <CategoriesPopover />
   </div>
        <div class="text-white">
            <img src="@/assets/images/logo.png" class="w-16 h-16">
        </div>

        <SearchInput class="w-8/12" v-if="innerWidth > 512" />
       
            <CartPopover />
          
    </header>
    <div v-if="innerWidth > 512">
        <div :class="{ 'bg-primary p-3 flex  justify-center gap-24': !!categoriesStore.categories, }">
            <RouterLink to="/" 
                class="text-white text-lg cursor-pointer hover:text-secondary hover:font-bold hover:animate-pulse transition-colors duration-500" >
                Home
            </RouterLink>
            <div  v-for="category  in categoriesStore.categories">
                <RouterLink :to="'/categoria/' + category.name" 
                class="text-white text-lg cursor-pointer hover:text-secondary hover:font-bold hover:animate-pulse transition-colors duration-500">
                {{ category.name }}
            </RouterLink>
        </div>

        </div>
    </div>
    <div v-else class="bg-primary flex justify-center">
        <SearchInput class="w-11/12" />
    </div>

</template>

<style scoped>

</style>
