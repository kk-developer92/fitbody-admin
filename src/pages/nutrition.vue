<template>
    <div>
        <div class="flex justify-end">
            <nuxt-link href="/nutrition/create">
                <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Добавить
                </button>
            </nuxt-link>
        </div>
        <div v-if="nutrition.length" class="w-full grid grid-cols-3 py-6 gap-4">
            <div class="cursor-pointer rounded-xl relative" v-for="nut in nutrition" @click="openModal(nut)">
                <img :src="nut.image" class="rounded-xl w-full h-72 object-cover" alt="">
                <div class="absolute bottom-4 left-4 font-medium">
                    <span class="text-white text-xl">{{ nut.title }}</span>
                </div>
                <div class="absolute top-4 right-4 font-medium bg-red-600 px-2 rounded-md">
                    <span class="text-white text-sm">
                        {{ nut.type }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300"/>
        </div>
        <nutrition-modal id="nutritionModal" @getFile="getFile"/>
    </div>
</template>

<script setup lang="ts">

import axios from "axios";
import Loader from "~/components/Loader.vue";
import {useModal} from "~/compasables/useModal";
import NutritionModal from "~/components/modals/NutritionModal.vue";

const url = import.meta.env.VITE_API_URL;
const nutrition = ref([]);
const modal = useModal('nutritionModal');
const formData = new FormData();

async function fetch() {
    const {data} = await axios.get(url + 'nutrition');
    nutrition.value = data.data;
}

fetch();

function openModal(data: any) {
    modal.open(data);
}

async function getFile(e: any, currentItem: any) {
    formData.append('image', e.currentTarget.files[0]);
    await axios.patch(`${url}nutrition/${currentItem._id}`, formData);
}
</script>

<style scoped>

</style>