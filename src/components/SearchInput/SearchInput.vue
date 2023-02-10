<script setup lang="ts">
const innerWidth = window.innerWidth

</script>

<template>
        <div v-if="innerWidth < 512" class=" flex justify-center">
            <input type="text" placeholder="Buscar produto" class="rounded-l-md pl-5 h-10 mb-5 w-full">
            <button class="rounded-r-md h-10 w-20 bg-secondary text-white font-medium">Buscar</button>
        </div>
        
        <div v-else class=" flex justify-center">
            <input type="text" placeholder="Buscar produto" class="rounded-l-md pl-5 h-12 mb-5 w-11/12">
            <button class="rounded-r-md h-12 w-20 bg-secondary text-white font-medium">Buscar</button>
        </div>
    
        
</template>