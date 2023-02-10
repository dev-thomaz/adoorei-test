<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key);
const loading = store.state.loading
</script>

<template>
    <div v-if="loading.isLoading" class="bg-white_soft flex justify-center h-screen">
        <img src="../../assets/images/loading2.gif" alt="" class="w-30 h-30">
    </div>
</template>