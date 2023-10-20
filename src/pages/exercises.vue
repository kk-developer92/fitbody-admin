<template>
    <div>
        <div class="flex justify-end">
            <button @click="useModal('exercisesModal').open()" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
        </div>
        <div v-if="exercises.length" class="w-full grid grid-cols-4 py-6 gap-4">
            <div class="w-full flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg transition-all"
                 v-for="exercise in exercises">
                <div class="flex items-center gap-6">
                    <img :src="exercise.image" class="rounded-xl w-16 h-16 object-cover" alt="">
                    <div class="bottom-4 left-4 font-medium">
                        <span class="text-xl">{{ exercise.name }}</span>
                    </div>
                </div>
                <div @click="useModal('exercisesModal').open(exercise)" class="cursor-pointer w-8">
                    <edit-icon @click="openModal(exercise)"/>
                </div>
            </div>
        </div>
        <div v-else class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300"/>
        </div>
        <exercises-modal/>
    </div>
</template>

<script setup lang="ts">

import axios from "axios";
import Loader from "~/components/Loader.vue";
import {useModal} from "~/compasables/useModal";
import NutritionModal from "~/components/modals/NutritionModal.vue";
import EditIcon from "assets/icons/EditIcon.vue";
import ExercisesModal from "~/components/modals/ExercisesModal.vue";

const url = import.meta.env.VITE_API_URL;
const exercises = ref([]);
const modal = useModal('nutritionModal');

async function fetch() {
    const {data} = await axios.get(url + 'exercises');
    exercises.value = data.data;
}

fetch();

function openModal(data?: any) {
    modal.open(data);
}

</script>

<style scoped>

</style>