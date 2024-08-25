<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <button @click="createTraining" class="p-2 px-6 bg-red-600 rounded-lg text-white">
                Добавить
            </button>
        </div>
        <div class="mt-5 flex gap-3">
            <button :class="{
                'text-red-500 font-semibold': lang === 'ru'
            }" @click="lang='ru';fetch()">Русский</button>
            <button :class="{
                'text-red-600 font-semibold': lang === 'uz'
            }" @click="lang='uz';fetch()">Узбекский</button>
        </div>
        <div v-if="courses.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <train-block :courses="courses" path="trainings" />
        </div>
        <div v-if="!courses.length" class="w-full ">
            <h1 class="text-center text-2xl mt-6">Тут пока пусто</h1>
        </div>
        <div v-if="isLoading" class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Loader from "~/components/Loader.vue";
import TrainBlock from "~/components/TrainBlock.vue";

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

const courses = ref([]);
const isLoading = ref(false);
const lang = ref('ru')

async function fetch() {
    isLoading.value = true;
    const { data } = await useService('trainings').find();
    courses.value = data.data.filter((item: any) => item.lang === lang.value);
    isLoading.value = false;
}

async function createTraining() {
    isLoading.value = true;
    try {
        const res = await useService('trainings').create({});

        await useRouter().push(`/trainings/${res.data.id}`);
    } catch (e: any) {
        console.log(e.message);
    } finally {
        isLoading.value = false;
    }
}


fetch();
</script>

<style scoped></style>