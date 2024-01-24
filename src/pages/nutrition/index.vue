<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <search-by-regex @search="searchIt"/>
            <button @click="navigateTo(`/nutrition/create`)" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
        </div>
        <div v-if="nutrition.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <div class="cursor-pointer rounded-xl relative" v-for="nut in nutrition"
                 @click="navigateTo(`/nutrition/${nut._id}`)">
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
    </div>
</template>

<script setup lang="ts">

import Loader from "~/components/Loader.vue";

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

const nutrition = ref([]);

async function fetch() {
    const {data} = await useService('nutrition').find();
    nutrition.value = data.data;
}

fetch();

async function searchIt(str: string) {
    await fetch();

    if (str === 'men' || str === 'women') {
        nutrition.value = nutrition.value.filter((el: any) => el.type === str)
    } else {
        nutrition.value = nutrition.value.filter((el: any) => el.title.toLowerCase().includes(str.toLowerCase()))
    }
}

</script>

<style scoped>

</style>