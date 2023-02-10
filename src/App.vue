<script setup lang="ts">
import { RouterView } from 'vue-router'
import  {Header,Loading}  from './components/';
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key);
const loading = store.state.loading
</script>

<template>
   <Header/>
   <Loading  v-if="loading.isLoading"/>
  <RouterView v-else />
</template>

<style scoped>

</style>
