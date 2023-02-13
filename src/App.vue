<script setup lang="ts">
import { RouterView } from 'vue-router'
import  {Header}  from './components/';
import { useStore } from 'vuex'
import { key } from '@/store'

const store = useStore(key);
</script>

<template>
   <Header/>
  <RouterView  />
</template>

