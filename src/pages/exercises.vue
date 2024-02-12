<template>
    <div>
        <div class="flex justify-end">
            <button @click="openModal()" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
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
                                <span class="text-xl">{{ exercise.name }}</span>
                            </div>
                        </div>
                        <div @click="useModal('exercisesModal').open(exercise)" class="cursor-pointer w-8 ml-2">
                            <edit-icon @click="openModal(exercise)"/>
                        </div>
                    </div>
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
definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

import Loader from "~/components/Loader.vue";
import {useModal} from "~/compasables/useModal";
import EditIcon from "assets/icons/EditIcon.vue";
import ExercisesModal from "~/components/modals/ExercisesModal.vue";

const selectedCategory = ref('');
const exercises = ref([]);
const modal = useModal('exercisesModal');

const categories: any = ref([]);


async function fetch() {
    const {data} = await useService('exercises').find();
    exercises.value = data.data;
    let exercise: any
    for (exercise of exercises.value) {
        if (!categories.value.includes(exercise.category)) {
            categories.value.push(exercise?.category);
        }
    }
    selectedCategory.value = categories.value[0];
}

fetch();

function openModal(data?: any) {
    modal.open({...data, category: selectedCategory.value});
}


</script>

<style scoped>

</style>