<template>
    <div>
        <div class="flex justify-end">
            <nuxt-link href="/courses/create">
                <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Добавить
                </button>
            </nuxt-link>
        </div>
        <div v-if="courses.length" class="w-full grid grid-cols-3 py-6 gap-4">
            <train-block :courses="courses" path="courses"/>
        </div>
        <div v-else class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import axios from "axios";
import Loader from "~/components/Loader.vue";
import TrainBlock from "~/components/TrainBlock.vue";

const url = import.meta.env.VITE_API_URL;
const courses = ref([]);


async function fetch() {
    const {data} = await axios.get(url + 'courses');
    courses.value = data.data;
}

fetch();
</script>

<style scoped>

</style>