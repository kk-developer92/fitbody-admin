<template>
    <div>
        <div class="flex justify-end">
            <nuxt-link href="/trainings/create">
                <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Добавить
                </button>
            </nuxt-link>
        </div>
        <div v-if="courses.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <train-block :courses="courses" path="trainings"/>
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
definePageMeta({
	authRoute: true,
	middleware: 'auth'
});

const url = import.meta.env.VITE_API_URL;
const courses = ref([]);


async function fetch() {
    const {data} = await axios.get(url + 'trainings');
    courses.value = data.data;
}

fetch();
</script>

<style scoped>

</style>