<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
import {key} from '../../store'
const router = useRouter()
const innerWidth = window.innerWidth
const inputValue = ref()
const store = useStore(key);
async function  submitSearch(){
    await store.dispatch('searchProduct', inputValue.value)
    router.push('/busca/')
}
</script>

<template>
        <div v-if="innerWidth < 512" class=" flex justify-center">
            <input v-model="inputValue" type="text" placeholder="Buscar produto" class="rounded-l-md pl-5 h-10 mb-5 w-full">
            <button @click="submitSearch" class="rounded-r-md h-10 w-20 bg-secondary text-white font-medium">Buscar</button>
        </div>
        
        <div v-else class=" flex justify-center">
            <input v-model="inputValue" type="text" placeholder="Buscar produto" class="rounded-l-md pl-5 h-12 mb-5 w-11/12">
            <button  @click="submitSearch" class="rounded-r-md h-12 w-20 bg-secondary text-white font-medium">Buscar</button>
        </div>
    
        
</template>