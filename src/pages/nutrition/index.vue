<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <button @click="createNutrition" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
        </div>
        <div class="mt-5 flex gap-3">
            <button :class="{
                'text-red-500 font-semibold': lang === 'ru'
            }" @click="lang = 'ru'; fetch()">Русский</button>
            <button :class="{
                'text-red-600 font-semibold': lang === 'uz'
            }" @click="lang = 'uz'; fetch()">Узбекский</button>
        </div>
        <div v-if="nutrition.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <div class="cursor-pointer rounded-xl relative" v-for="nut in nutrition"
                @click="navigateTo(`/nutrition/${nut.id}`)">
                <img :src="nut.image" class="rounded-xl w-full h-72 object-cover" alt="">
                <div class="absolute bottom-4 left-4 font-medium">
                    <span class="text-white text-xl">{{ nut.title }}</span>
                </div>
                <div class="absolute top-4 right-4 font-medium bg-red-600 px-2 rounded-md">
                    <span class="text-white text-sm">
                        {{ type[nut?.type] }}
                    </span>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300" />
        </div>
        <div v-if="!nutrition.length" class="w-full ">
            <h1 class="text-center text-2xl mt-6">Тут пока пусто</h1>
        </div>
    </div>
</template>

<script setup lang="ts">

import Loader from "~/components/Loader.vue";

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

const type = ref({
    0: 'мужской',
    1: 'женский'
})
const lang = ref('ru');
const nutrition: any = ref([]);
const isLoading = ref(false);

async function fetch() {
    isLoading.value = true;
    const { data } = await useService('nutrition').find();
    nutrition.value = data.data.filter((item: any) => item.lang === lang.value);
    isLoading.value = false;
}

fetch();


async function createNutrition() {
    isLoading.value = true;
    try {
        const res = await useService('nutrition').create({});

        await useRouter().push(`/nutrition/${res.data.id}`);
    } catch (e: any) {
        console.log(e.message);
    } finally {
        isLoading.value = false;
    }
}

</script>

<style scoped></style>