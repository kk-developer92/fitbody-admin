<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading" />
    <div>
        <form>
            <div class="w-full flex gap-5">
                <div class="w-1/3 flex flex-col gap-4">
                    <label class="w-full">
                        <image-uploader :image="course.image" />
                        <input type="file" @change="getFile" class="hidden">
                    </label>
                    <div class="flex flex-col gap-4">
                        <div class="grid grid-cols-3 gap-4">
                            <label class="flex flex-col gap-1 w-full">
                                <span>Язык</span>
                                <select @change="debouncedCourse(course)" v-model="course.lang"
                                    class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="ru">Русский</option>
                                    <option value="uz">Узбекский</option>
                                </select>
                            </label>
                            <label class="flex flex-col gap-1 w-full">
                                <span>Название</span>
                                <input type="text"
                                    class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                    @input="debouncedCourse(course)" v-model="course.title">
                            </label>
                            <label class="flex flex-col gap-1 w-full">
                                <span>Цена</span>
                                <input type="number" @input="debouncedCourse(course)"
                                    class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                    v-model="course.price">
                            </label>
                            <div class="w-full">
                                <span>Пол</span>
                                <select @change="debouncedCourse(course)" v-model="course.type"
                                    class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="0">Мужской</option>
                                    <option value="1">Женский</option>
                                </select>
                            </div>
                            <div class="w-full">
                                <span>Сложность</span>
                                <select @change="debouncedCourse(course)" v-model="course.complexity"
                                    class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="0">Начинаюший</option>
                                    <option value="1">Продвинутый</option>
                                </select>
                            </div>
                            <label class="w-full">
                                <span>Срок</span>
                                <input type="number"
                                    class="border w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                    @input="debouncedExpiration(course, $event)"
                                    :value="Math.round(course.expiresInMs / 86400000)">
                            </label>
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <span>О программе</span>
                            <ckeditor @input="debouncedCourse(course)" :editor="editor" v-model="course.about"
                                :config="editorConfig"></ckeditor>
                        </div>
                        <div class="w-full flex flex-col gap-1">
                            <span>Описание</span>
                            <ckeditor @input="debouncedCourse(course)" :editor="editor" v-model="course.description"
                                :config="editorConfig"></ckeditor>
                        </div>
                    </div>
                </div>
                <div class="w-2/3">
                    <div v-if="course.weeks?.length" class="flex flex-col gap-5">
                        <div class="border border-gray-400 p-2 rounded-lg" v-for="week in course.weeks">
                            <div class="flex justify-between">
                                <div class="flex gap-2 items-center  w-full">
                                    <input type="text" class="text-2xl w-full mb-2" v-model="week.title"
                                        @input="debouncedWeek(week)">
                                </div>
                                <button type="button"
                                    class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                    <cross-icon @click="deleteWeek(week)" />
                                </button>
                            </div>
                            <div v-if="week.days?.length" v-for="day in week.days"
                                class="w-full p-2 border border-gray-400  rounded-lg mt-2">
                                <div class="flex justify-between">
                                    <div class="flex gap-2 items-center w-full">
                                        <input type="text" class="text-2xl w-full mb-2" v-model="day.title"
                                            @input="debouncedDay(day)">
                                    </div>
                                    <button type="button"
                                        class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                        <cross-icon @click="deleteDay(day)" class="cursor-pointer" />
                                    </button>
                                </div>
                                <div v-for="dayList in day.dayList"
                                    class="p-2 mt-2 mb-4 border border-gray-400 rounded-lg">
                                    <div class="flex justify-between border-b">
                                        <div class="flex items-center gap-2 mb-3">
                                            <span class="text-xl font-bold border-none">Тренировки</span>
                                            <input type="number" class="w-12 text-xl font-bold border-none"
                                                @input="debouncedDayList(dayList)" v-model="dayList.reps">
                                        </div>
                                        <button type="button"
                                            class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                            <cross-icon @click="deleteDayList(dayList)" class="cursor-pointer" />
                                        </button>
                                    </div>
                                    <div class="flex flex-col gap-2 mt-2">
                                        <div v-for="exercises in dayList.exercises" class="flex gap-3">
                                            <img class="w-16 rounded-md" :src="exercises.exercise.image" alt="">
                                            <div class="flex w-full items-center justify-between">
                                                <div class="flex flex-col">
                                                    <span class="text-lg font-medium">{{
                                                        exercises.exercise.title
                                                    }}</span>
                                                    <div class="">
                                                        <input type="text" class="border mr-2 w-20"
                                                            @input="debouncedExercise(exercises)"
                                                            v-model="exercises.reps">
                                                        <span>раз</span>
                                                    </div>
                                                </div>
                                                <button type="button"
                                                    class="w-8 h-8 hover:bg-gray-200 flex items-center justify-center rounded-full">
                                                    <cross-icon @click="deleteExercise(exercises)"
                                                        class="cursor-pointer" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="w-full flex items-center justify-center">
                                            <span @click="addExercise({ dayListId: dayList.id })"
                                                class="text-red-600 text-lg select-none cursor-pointer">Добавить
                                                упражнения</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full flex items-center justify-center">
                                    <span @click="addDayList({ dayId: day.id, reps: 0 })"
                                        class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить
                                        блок тренировки</span>
                                </div>
                            </div>
                            <div class="w-full flex mt-3 items-center justify-center">
                                <span @click="addDay({ weekId: week.id, title: 'Название', content: '' })"
                                    class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить
                                    день</span>
                            </div>
                        </div>
                    </div>
                    <div @click="addWeek({ trainingId: course.id, title: 'Название' })"
                        class="w-full flex mt-10 items-center justify-center">
                        <span class="text-red-600 text-lg select-none cursor-pointer text-center">Добавить неделю</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <button v-if="course.id" @click="deleteCourse" type="button"
                    class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Удалить
                </button>
                <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                    Сохранить
                </button>
            </div>
        </form>
        <add-exercises @close="close" @fetch="fetch" lang="ru" />
    </div>
</template>

<script setup lang="ts">


import ImageUploader from "~/components/ImageUploader.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useModal } from '~/compasables/useModal';
import AddExercises from "~/components/modals/AddExercises.vue";
import { useDebounceFn } from "@vueuse/core";
import CrossIcon from "assets/icons/CrossIcon.vue";
import axios from "axios";

const course: any = ref({});
const editor = ref(ClassicEditor);
const id: any = useRoute().params.id;
const editorConfig = ref({
    language: 'ru',
    items: ['insertImage'],
    mediaEmbed: {
        previewsInData: true
    },
    extraPlugins: [MyCustomUploadAdapterPlugin]
});

function MyCustomUploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new MyUploadAdapter(loader);
    };
}

class MyUploadAdapter {
    loader: any
    constructor(loader: any) {
        this.loader = loader;
    }

    async upload() {
        const file = await this.loader.file;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);

            return {
                default: response.data.url
            };
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    }

    abort() {
        // Cleanup if upload is aborted
    }
}

const modal = useModal('addModal');
const isLoading = ref(false);

async function fetch() {
    isLoading.value = true;
    const { data } = await useService('trainings').get(id);

    course.value = data.data;
    isLoading.value = false;
}

fetch();


async function close() {
    modal.close();
}

async function submit() {
    await useRouter().push('/trainings');
}

async function getFile(e: any) {
    isLoading.value = true;
    const formData = new FormData();

    formData.append('image', e.currentTarget.files[0]);

    try {
        await useService('trainings').patch(course.value.id, formData);
    } catch (e: any) {
        console.log(e);
    } finally {
        isLoading.value = false;
    }

    await fetch();
}


async function deleteCourse() {
    await useService('trainings').delete(id);

    await useRouter().push('/trainings');
}

async function addWeek(data: any) {
    await useService('weeks').create(data);

    await fetch();
}

async function addDay(data: any) {
    await useService('days').create(data);

    await fetch();
}

async function addDayList(data: any) {
    await useService('day-list').create(data);

    await fetch();
}

async function addExercise(data: any) {
    modal.open({ data, lang: course.value.lang });
}

async function deleteExercise(data: any) {
    await useService('exercise-mtm').delete(data.id);

    await fetch();
}

async function deleteDayList(data: any) {
    await useService('day-list').delete(data.id);

    await fetch();
}

async function deleteDay(data: any) {
    await useService('days').delete(data.id);

    await fetch();
}

async function deleteWeek(data: any) {
    await useService('weeks').delete(data.id);

    await fetch();
}

const debouncedWeek = useDebounceFn(async (data: any) => {
    await useService('weeks').patch(data.id, data);
}, 10)

const debouncedDay = useDebounceFn(async (data: any) => {
    await useService('days').patch(data.id, data);
}, 10)

const debouncedCourse = useDebounceFn(async (data: any) => {
    await useService('trainings').patch(id, data);
}, 10)

const debouncedExpiration = useDebounceFn(async (data: any, e: any) => {
    data.expiresInMs = +e.target.value * 86400000;
    await useService('trainings').patch(id, data);
}, 10)

const debouncedDayList = useDebounceFn(async (data: any) => {
    await useService('day-list').patch(data.id, data);
}, 10)

const debouncedExercise = useDebounceFn(async (data: any) => {
    await useService('exercise-mtm').patch(data.id, data);
}, 10)

</script>

<style scoped></style>