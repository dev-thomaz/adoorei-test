<script setup lang="ts">
import { ProductCard, Loading } from '@/components';
import { key } from '@/store';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'
import {SadIcon} from '@/components/icons'

const store = useStore(key);
const productsStore = store.state.products
const route = useRoute()

</script>

<template>
	<Loading />
<div class="p-5 text-xl">
    <span class="font-medium underline">Resultado da busca {{route.params.query}}</span>
</div>
	<div  class="flex p-4 gap-3 flex-wrap justify-center">
		<ProductCard v-for="product in productsStore.products" :product="product" />
	</div>
<div v-if="productsStore.products.length === 0" class="flex justify-center flex-col items-center gap-2">
    <SadIcon class="w-10"/>
  <span class="text-lg font-medium">  Lamentamos, mas não encontramos nenhum produto para essa busca, tente pesquisar com outro nome </span>
</div>
</template>