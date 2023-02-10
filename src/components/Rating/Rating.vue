<script setup lang="ts">
import { h } from 'vue';
import type { RatingState } from '@/store/products-store';
import HalfStarIcon from '@/components/icons/IconHalfStar.vue';
import FilledStarIcon from '@/components/icons/IconFilledStar.vue';
import EmptyStarIcon from '@/components/icons/IconEmptyStar.vue';
const props = defineProps<{
    rating: RatingState
}>()
const innerWidth = window.innerWidth

function generateRatingStar(rating: RatingState) {
    let rateStar = []
    const rate = rating.rate
    for (let index = 1; index <= 5; index++) {
        if (index <= rate) {
            rateStar.push('full')
        }
        if ((rate % 1 > 0.4) && index === Math.round(rate)) {
            rateStar.push('half')
        }
        else if (index > rate) {
            rateStar.push('empty')
        }
    }
    return rateStar
}

generateRatingStar(props.rating)
</script>


<template>
    <div v-if="innerWidth > 512" class="flex pt-6 items-center">
        <span v-for="star in generateRatingStar(rating)" class="text-primary flex">
            <FilledStarIcon v-if="star == 'full'" />
            <EmptyStarIcon v-if="star == 'empty'" />
            <HalfStarIcon v-if="star == 'half'" />
        </span>
        <span class="text-sm ml-5 text-gray">{{rating.count}} avaliações</span>
    </div>
    <div v-else class="flex flex-col py-3 items-center">
        <div class="flex">
            <span v-for="star in generateRatingStar(rating)" class="text-primary flex">
                <FilledStarIcon v-if="star == 'full'" />
                <EmptyStarIcon v-if="star == 'empty'" />
                <HalfStarIcon v-if="star == 'half'" />
            </span>
        </div>
        <span class="text-sm ml-5 text-gray">{{rating.count}} avaliações</span>
    </div>
</template>