<script setup lang="ts">
import { h } from 'vue';
import type { RatingState } from '@/store/products-store';
import HalfStarIcon from '@/components/icons/IconHalfStar.vue';
import FilledStarIcon from '@/components/icons/IconFilledStar.vue';
import EmptyStarIcon from '@/components/icons/IconEmptyStar.vue';
const props = defineProps<{
    rating: RatingState
}>()

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
    <div class="flex pt-6 items-center">
        <span v-for="star in generateRatingStar(rating)" class="text-primary flex">
            <FilledStarIcon v-if="star == 'full'" />
            <EmptyStarIcon v-if="star == 'empty'" />
            <HalfStarIcon v-if="star == 'half'" />
        </span>
        <span class="text-sm ml-5 text-gray">{{rating.count}} avaliações</span>
    </div>
</template>