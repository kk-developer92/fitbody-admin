<template>
    <div>
        <form>
            <div class="w-full flex gap-5">
                <div class="w-1/3 flex flex-col gap-4">
                    <label class="w-full">
                        <image-uploader :image="course.image"/>
                        <input type="file" class="hidden">
                    </label>
                    <div class="flex flex-col gap-4">
                        <div class="grid grid-cols-3 gap-4">
                            <base-input :value="course.title" label="Название"/>
                            <base-input :value="course.price" type="number" label="Цена"/>
                            <div class="w-full">
                                <span>Пол</span>
                                <select v-model="course.type" class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="men">Мужской</option>
                                    <option value="women">Женский</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="course.shortDescription" class="w-full flex flex-col gap-1">
                            <span>Краткое описание</span>
                            <editor v-model="course.shortDescription"/>
                        </div>
                        <div v-if="course.description" class="w-full flex flex-col gap-1">
                            <span>Описание</span>
                            <editor v-model="course.description"/>
                        </div>
                    </div>
                    <!--                <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">-->
                    <!--                    Сохранить-->
                    <!--                </button>-->
                </div>
                <div class="w-2/3">
                    <div v-if="course.exercises?.length"
                         class="flex flex-col gap-5 border border-gray-400 rounded-lg p-2">
                        <div v-for="week in course.exercises">
                            <input type="text" class="text-2xl font-bold border-none" v-model="week.name">
                            <div v-if="week.data?.length" v-for="day in week.data"
                                 class="p-2 border border-gray-400 rounded-lg mt-2">
                                <input type="text" class="text-xl font-bold border-none" v-model="day.name">
                                <div v-for="train in day.trainings"
                                     class="p-2 mt-2 mb-4 border border-gray-400 rounded-lg">
                                    <div class="flex items-center gap-2 mb-3">
                                        <span class="text-xl font-bold border-none">Подходы</span>
                                        <input type="number" class="w-12 text-xl font-bold border-none"
                                               v-model="train.reps">
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <div v-for="exercises in train.exercises" class="flex gap-3">
                                            <img class="w-16 rounded-md" :src="exercises.image" alt="">
                                            <div class="flex w-full items-center justify-between">
                                                <span class="text-lg font-medium">{{ exercises.title }}</span>
                                                <edit-icon class="cursor-pointer"/>
                                            </div>
                                        </div>
                                        <button type="button"
                                                class="w-full flex justify-center items-center p-3 border-red-600 border-2 rounded-lg hover:bg-red-50">
                                            <span class="text-red-600 text-lg">Добавить тренировку</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="button"
                                        class="w-full flex justify-center items-center p-3 border-red-600 border-2 rounded-lg hover:bg-red-50">
                                    <span class="text-red-600 text-lg">Добавить блок тренировки</span>
                                </button>
                            </div>
                        </div>
                        <button type="button"
                                class="w-full flex justify-center items-center p-3 border-red-600 border-2 rounded-lg hover:bg-red-50">
                            <span class="text-red-600 text-lg">Добавить день</span>
                        </button>
                    </div>
                    <button type="button"
                            @click="open"
                            class="w-full mt-4 flex justify-center items-center p-3 border-red-600 border-2 rounded-lg hover:bg-red-50">
                        <span class="text-red-600 text-lg">Добавить неделью</span>
                    </button>
                </div>
                 <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Сохранить
                    </button>
            </div>
        </form>
        <create-week/>
    </div>
</template>

<script setup lang="ts">


import axios from "axios";
import BaseInput from "~/components/BaseInput.vue";
import ImageUploader from "~/components/ImageUploader.vue";
import EditIcon from "assets/icons/EditIcon.vue";
import {useModal} from "~/compasables/useModal";
import CreateWeek from "~/components/modals/createWeek.vue";

const props = defineProps<{ id: any, path: string }>();
const course = ref({});
const url = import.meta.env.VITE_API_URL;

async function fetch() {
    const {data} = await axios.get(url + `${props.path}/` + props.id);
    course.value = data;
}

if (props.id) {
    fetch();
}


function open() {
    useModal('weekModal').open();
}
</script>

<style scoped>

</style>