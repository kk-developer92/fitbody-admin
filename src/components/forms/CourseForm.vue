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
                            <label class="flex flex-col gap-1 w-full">
                                <span>Название</span>
                                <input type="text"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="course.title">
                            </label>
                            <label class="flex flex-col gap-1 w-full">
                                <span>Цена</span>
                                <input type="number"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="course.price">
                            </label>
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
                </div>
                <div class="w-2/3">
                    <div v-if="course.exercises?.length"
                         class="flex flex-col gap-5">
                        <div class="border border-gray-400 p-2 rounded-lg" v-for="(week, idx) in course.exercises">
                            <div class="flex justify-between">
                                <input type="text" class="text-2xl font-bold border-none" v-model="week.name">
                                <button type="button"
                                        class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                    <cross-icon class="cursor-pointer"/>
                                </button>
                            </div>
                            <div v-if="week.data?.length" v-for="(day, index) in week.data"
                                 class="w-full p-2 border border-gray-400  rounded-lg mt-2">
                                <div class="flex justify-between">
                                    <input type="text" class="text-xl font-bold border-none" v-model="day.name">
                                    <button type="button"
                                            class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                        <cross-icon class="cursor-pointer"/>
                                    </button>
                                </div>
                                <div v-for="(train, ind) in day.trainings"
                                     class="p-2 mt-2 mb-4 border border-gray-400 rounded-lg">
                                    <div class="flex justify-between border-b">
                                        <div class="flex items-center gap-2 mb-3">
                                            <span class="text-xl font-bold border-none">Подходы</span>
                                            <input type="number" class="w-12 text-xl font-bold border-none"
                                                   v-model="train.reps">
                                        </div>
                                        <button type="button"
                                                class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                            <cross-icon class="cursor-pointer"/>
                                        </button>
                                    </div>
                                    <div class="flex flex-col gap-2 mt-2">
                                        <div v-for="exercises in train.exercises" class="flex gap-3">
                                            <img class="w-16 rounded-md" :src="exercises.image" alt="">
                                            <div class="flex w-full items-center justify-between">
                                                <span class="text-lg font-medium">{{ exercises.title }}</span>
                                                <button type="button"
                                                        class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                                    <cross-icon class="cursor-pointer"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="w-full flex items-center justify-center">
                                            <span
                                                @click="createTrainings(idx, index, ind)"
                                                class="text-red-600 text-lg select-none cursor-pointer">Добавить тренировку</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex items-center justify-center">
                                    <span
                                        @click="createTrainingBlock(idx, index)"
                                        class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить блок тренировки</span>
                                </div>
                            </div>
                            <div class="w-full flex mt-3 items-center justify-center">
                                <span
                                    @click="createDay(idx)"
                                    class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить день</span>
                            </div>
                        </div>
                    </div>
                    <div
                        @click="createWeek"
                        class="w-full flex mt-3 items-center justify-center">
                        <span
                            class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить неделью</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Сохранить
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">


import axios from "axios";
import ImageUploader from "~/components/ImageUploader.vue";
import CrossIcon from "assets/icons/CrossIcon.vue";

const props = defineProps<{ id: any, path: string }>();
const course: any = ref({});
const url = import.meta.env.VITE_API_URL;

async function fetch() {
    const {data} = await axios.get(url + `${props.path}/` + props.id);
    course.value = data;
}

if (props.id) {
    fetch();
}

function createWeek() {
    course.value?.exercises.push({name: "Week"});
}

function createDay(idx: any) {
    course.value?.exercises[idx].data.push({name: "Some day"});
}

function createTrainingBlock(idx: any, index: any) {
    course.value?.exercises[idx].data[index].trainings.push({reps: 1, exercises: []});
}

function createTrainings(idx: any, index: any, ind: any) {
    console.log(course.value?.exercises[idx].data[index].trainings[ind].exercises);
}

async function submit() {
    console.log(course.value.price)
    await axios.patch(`${url}${props.path}/${props.id}`, course.value);
}

</script>

<style scoped>

</style>