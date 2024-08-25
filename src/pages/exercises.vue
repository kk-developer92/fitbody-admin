<template>
    <div>
        <div class="flex justify-end">
            <button @click="createExercise()" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
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
        <div v-if="exercises.length">
            <div class="flex gap-5 w-full py-3">
                <span class="text-xl cursor-pointer select-none" :class="{
                    'router-link-exact-active': category === selectedCategory
                }" v-for="category in categories" @click="selectedCategory = category">{{ category }}</span>
            </div>
            <div class="w-full grid grid-cols-3 gap-4 select-none">
                <div v-for="exercise in exercises" :class="{
                    'hidden': exercise?.category !== selectedCategory
                }">
                    <div
                        class="w-full flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg transition-all">
                        <div class="flex items-center gap-6">
                            <img :src="exercise.image" class="rounded-xl w-16 h-16 object-cover" alt="">
                            <div class="bottom-4 left-4 font-medium">
                                <span class="text-xl">{{ exercise.title }}</span>
                            </div>
                        </div>
                        <div @click="useModal('exercisesModal').open(exercise)" class="cursor-pointer w-8 ml-2">
                            <edit-icon @click="openModal(exercise)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isLoading" class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300" />
        </div>
        <div v-if="!exercises.length" class="w-full ">
            <h1 class="text-center text-2xl mt-6">Тут пока пусто</h1>
        </div>
        <exercises-modal @fetch="fetch" />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

import Loader from "~/components/Loader.vue";
import { useModal } from "~/compasables/useModal";
import EditIcon from "assets/icons/EditIcon.vue";
import ExercisesModal from "~/components/modals/ExercisesModal.vue";

const selectedCategory = ref('');
const exercises: any = ref([]);
const modal = useModal('exercisesModal');
const lang = ref('ru');
const categories: any = ref([]);
const isLoading = ref(false);

async function fetch() {
    isLoading.value = true;
    const { data } = await useService('exercises').find();

    exercises.value = data.data.filter((item: any) => item.lang === lang.value);

    let exercise: any

    for (exercise of exercises.value) {
        if (!categories.value.includes(exercise.category)) {
            categories.value.push(exercise?.category);
        }
    }

    selectedCategory.value = categories.value[0];
    isLoading.value = false;
}

fetch();

function openModal(data?: any) {
    modal.open({ id: data.id });
}

async function createExercise() {
    isLoading.value = true;
    const data = await useService('exercises').create({
        title: 'ничегго',
        image: 'ничегго',
        video: 'ничегго',
        category: selectedCategory.value || 'Бицепс',
        lang: 'ru'
    });
    isLoading.value = false;
    modal.open({ id: data.data.id });
}

</script>

<style scoped></style>