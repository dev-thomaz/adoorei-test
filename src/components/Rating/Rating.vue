<script setup lang="ts">
import { h } from 'vue';
import type { RatingState } from '@/store/products-store';
import {HalfStarIcon} from '@/components/icons/';
import {FilledStarIcon} from '@/components/icons/';
import {EmptyStarIcon} from '@/components/icons/';
import {generateRatingStar} from '@/helper/helpers'
const props = defineProps<{
    rating: RatingState
}>()
const innerWidth = window.innerWidth



generateRatingStar(props.rating)
</script>


<template>
    <div v-if="innerWidth > 512" class="flex items-center">
        <span v-for="star in generateRatingStar(rating)" class="text-primary flex">
            <FilledStarIcon v-if="star == 'full'" />
            <EmptyStarIcon v-if="star == 'empty'" />
            <HalfStarIcon v-if="star == 'half'" />
        </span>
        <span class="text-sm ml-2 text-gray">({{rating.count}} avaliações)</span>
    </div>
    <div v-else class="flex flex-col justify-center items-center">
        <div class="flex">
            <span v-for="star in generateRatingStar(rating)" class="text-primary flex">
                <FilledStarIcon v-if="star == 'full'" />
                <EmptyStarIcon v-if="star == 'empty'" />
                <HalfStarIcon v-if="star == 'half'" />
            </span>
        </div>
        <span class="text-sm  text-gray">{{rating.count}} avaliações</span>
    </div>
</template>