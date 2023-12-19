<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading"/>
    <div>
        <form>
            <div class="w-full flex gap-5">
                <div class="w-1/3 flex flex-col gap-4">
                    <label class="w-full">
                        <image-uploader :image="course.image"/>
                        <input type="file"
                               @change="getFile"
                               class="hidden">
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
                            <div class="w-full">
                                <span>Сложность</span>
                                <select v-model="course.complexity"
                                        class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="beginner">Начинаюший</option>
                                    <option value="advanced">Продвинутый</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="props.path === 'courses'" class="w-full flex flex-col gap-1">
                            <span>Краткое описание</span>
                            <ckeditor :editor="editor" v-model="course.shortDescription"
                                      :config="editorConfig"></ckeditor>
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <span>О программе</span>
                            <ckeditor :editor="editor" v-model="course.about_program"
                                      :config="editorConfig"></ckeditor>
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <span>Описание</span>
                            <ckeditor :editor="editor" v-model="course.description" :config="editorConfig"></ckeditor>
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
                                    <cross-icon
                                        @click="deleteBlock(course.exercises, idx)"
                                    />
                                </button>
                            </div>
                            <div v-if="week.data?.length" v-for="(day, index) in week.data"
                                 class="w-full p-2 border border-gray-400  rounded-lg mt-2">
                                <div class="flex justify-between">
                                    <input type="text" class="text-xl font-bold border-none" v-model="day.name">
                                    <button type="button"
                                            class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                        <cross-icon
                                            @click="deleteBlock(week.data, index)"
                                            class="cursor-pointer"/>
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
                                            <cross-icon
                                                @click="deleteBlock(day.trainings, ind)"
                                                class="cursor-pointer"/>
                                        </button>
                                    </div>
                                    <div class="flex flex-col gap-2 mt-2">
                                        <div v-for="(exercises, delIdx) in train.exercises" class="flex gap-3">
                                            <img class="w-16 rounded-md" :src="exercises.image" alt="">
                                            <div class="flex w-full items-center justify-between">
                                                <span class="text-lg font-medium">{{ exercises.name }}</span>
                                                <button type="button"
                                                        class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                                    <cross-icon
                                                        @click="deleteBlock(train.exercises, delIdx)"
                                                        class="cursor-pointer"/>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="w-full flex items-center justify-center">
                                            <span
                                                @click="addTraining(train.exercises)"
                                                class="text-red-600 text-lg select-none cursor-pointer">Добавить тренировку</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex items-center justify-center">
                                    <span
                                        @click="addBlock(day.trainings, {reps: 1, exercises: []})"
                                        class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить блок тренировки</span>
                                </div>
                            </div>
                            <div class="w-full flex mt-3 items-center justify-center">
                                <span
                                    @click="addBlock(week.data, {name: 'Some day', trainings: []})"
                                    class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить день</span>
                            </div>
                        </div>
                    </div>
                    <div
                        @click="addBlock(course.exercises, {name: 'Week', data:[]})"
                        class="w-full flex mt-10 items-center justify-center">
                        <span
                            class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить неделью</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <button v-if="course._id" @click="deleteCourse" type="button"
                        class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Удалить
                </button>
                <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Сохранить
                </button>
            </div>
        </form>
        <add-exercises @close="close"/>
    </div>
</template>

<script setup lang="ts">


import axios from "axios";
import ImageUploader from "~/components/ImageUploader.vue";
import CrossIcon from "assets/icons/CrossIcon.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useModal} from '~/compasables/useModal';
import AddExercises from "~/components/modals/AddExercises.vue";

const props = defineProps<{ id: any, path: string }>();
const course: any = ref({});
const url = import.meta.env.VITE_API_URL;
const formData = new FormData();

const editor = ref(ClassicEditor);
const editorConfig = ref({
    language: 'ru'
});
const modal = useModal('addModal');
const isLoading = ref(false);

async function fetch() {
    isLoading.value = true;
    const {data} = await axios.get(url + `${props.path}/` + props.id);
    course.value = data;
    isLoading.value = false;
}

if (props.id !== 'create') {
    fetch();
}

function addBlock(data: any, obj: any) {
    data.push(obj);
}

function deleteBlock(data: any, index: any) {
    data.splice(index, 1);
}

function addTraining(data: any) {
    modal.open(data);
}

function close() {
    modal.close();
}

async function submit() {
    isLoading.value = true;
    if (props.id === 'create') {
        const data = await axios.post(`${url}${props.path}/`, course.value);
        await axios.patch(`${url}${props.path}/${data.data._id}`, formData);
        window.location.href = `http://localhost:3000/${props.path}`;
        isLoading.value = false;
        return;
    }
    await axios.patch(`${url}${props.path}/${props.id}`, course.value);
    isLoading.value = false;
    useRouter().back();
}

async function getFile(e: any) {
    isLoading.value = true;
    formData.append('image', e.currentTarget.files[0]);

    if (props.id !== 'create') {
        await axios.patch(`${url}${props.path}/${props.id}`, formData);
    }
    await fetch();
}

async function deleteCourse() {
    isLoading.value = true;
    await axios.delete(`${url}${props.path}/${course.value._id}`);
    window.location.href = `http://localhost:3000/${props.path}`;
    isLoading.value = false;
}

</script>

<style scoped>

</style>