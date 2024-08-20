<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading" />
    <div class="w-full flex items-center justify-center">
        <form class="w-full rounded-lg flex">
            <div class="p-4 pl-0 w-1/3">
                <label class="w-full">
                    <image-uploader class="w-full h-96" :image="currentItem.image" />
                    <input type="file" @change="getFile" class="hidden">
                </label>
                <div class="flex flex-col gap-4">
                    <div class="grid grid-cols-3 gap-4">
                        <label class="flex flex-col gap-1 w-full">
                            <span>Название(ru)</span>
                            <input type="text" @input="debouncedCourse(currentItem)"
                                class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                v-model="currentItem.ruTitle">
                        </label>
                        <label class="flex flex-col gap-1 w-full">
                            <span>Название(uz)</span>
                            <input type="text" @input="debouncedCourse(currentItem)"
                                class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                v-model="currentItem.uzTitle">
                        </label>
                        <label class="flex flex-col gap-1 w-full">
                            <span>Цена</span>
                            <input type="number"
                                class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                @input="debouncedCourse(currentItem)" v-model="currentItem.price">
                        </label>
                        <div class="w-full">
                            <span>Пол</span>
                            <select v-model="currentItem.type" @change="debouncedCourse(currentItem)"
                                class="w-full border p-2 rounded-lg outline-none mt-1">
                                <option value="0">Мужской</option>
                                <option value="1">Женский</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <span>Сложность</span>
                            <select v-model="currentItem.complexity" @change="debouncedCourse(currentItem)"
                                class="w-full border p-2 rounded-lg outline-none mt-1">
                                <option value="0">Начинаюший</option>
                                <option value="1">Продвинутый</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Краткое описание(ru)</span>
                        <ckeditor :editor="editor" v-model="currentItem.ruShortDescription"
                            @input="debouncedCourse(currentItem)" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Краткое описание(uz)</span>
                        <ckeditor :editor="editor" v-model="currentItem.uzShortDescription"
                            @input="debouncedCourse(currentItem)" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>О программе(ru)</span>
                        <ckeditor :editor="editor" v-model="currentItem.ruAbout" @input="debouncedCourse(currentItem)"
                            :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>О программе(uz)</span>
                        <ckeditor :editor="editor" v-model="currentItem.uzAbout" @input="debouncedCourse(currentItem)"
                            :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="w-2/3 flex flex-col gap-4 p-4">
                <div class="flex flex-col gap-4">
                    <h1 class="text-3xl">Контент</h1>
                    <div v-for="content in currentItem.weeks" class="w-full flex flex-col gap-1 border p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex gap-2 items-center">
                                <b class="">Ru: </b>
                                <input type="text" class="text-2xl w-1/3 mb-2" v-model="content.ruTitle"
                                    @input="debouncedWeek(content)">
                            </div>

                            <div class="flex gap-2 items-center">
                                <b>Uz: </b>
                                <input type="text" class="text-2xl w-1/3 mb-2" v-model="content.uzTitle"
                                    @input="debouncedWeek(content)">
                            </div>
                            <cross-icon @click="deleteWeek(content.id)" class="cursor-pointer" />
                        </div>
                        <div v-for="days in content.days" class="border-t pt-2 mt-1 flex flex-col gap-2">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex gap-2 items-center">
                                    <b class="">Ru: </b>
                                    <input type="text" class="text-2xl w-1/3 mb-2" v-model="days.ruTitle"
                                        @input="debouncedDay(days)">
                                </div>

                                <div class="flex gap-2 items-center">
                                    <b>Uz: </b>
                                    <input type="text" class="text-2xl w-1/3 mb-2" v-model="days.uzTitle"
                                        @input="debouncedDay(days)">
                                </div>
                                <cross-icon @click="deleteDay(days.id)" class="cursor-pointer" />
                            </div>
                            <label for="">Контент (uz)</label>
                            <ckeditor @input="debouncedDay(days)" :editor="editor" v-model="days.uzContent"
                                :config="editorConfig"></ckeditor>
                            <label for="">Контент (ru)</label>
                            <ckeditor @input="debouncedDay(days)" :editor="editor" v-model="days.ruContent"
                                :config="editorConfig"></ckeditor>
                        </div>
                        <button type="button"
                            @click="addDay({ weekId: content.id, uzTitle: 'Ничего', ruTitle: 'Hech narsa', content: '' })"
                            class="text-red-600">Добавить блок
                        </button>
                    </div>
                    <button type="button"
                        @click="addWeek({ courseId: currentItem.id, uzTitle: 'Ничего', ruTitle: 'Hech narsa' })"
                        class="text-red-600 w-full">Добавить день
                    </button>
                </div>
                <div class="flex justify-end gap-4">
                    <button v-if="currentItem.id" @click.prevent="deleteCourse"
                        class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Удалить
                    </button>
                    <button @click.prevent="useRouter().push('/')"
                        class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Сохранить
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

import ImageUploader from "~/components/ImageUploader.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CrossIcon from "assets/icons/CrossIcon.vue";
import { useDebounceFn } from '@vueuse/core';

const currentItem: any = ref({ content: [] });
const editor = ref(ClassicEditor);
const editorConfig = ref({
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    }
});
const isLoading = ref(false);
const id: any = useRoute().params.id;

async function fetch() {
    const data = await useService('courses').get(id);
    currentItem.value = data.data.data;
}

fetch();


async function addWeek(data: any) {
    try {
        await useService('weeks').create(data);

        await fetch();
    } catch (e: any) {
        console.log(e.message);
    }
}


async function addDay(data: any) {
    try {
        await useService('days').create(data);

        await fetch();
    } catch (e: any) {
        console.log(e.message);
    }
}

async function deleteWeek(id: number) {
    try {
        await useService('weeks').delete(id);

        await fetch();
    } catch (e: any) {
        console.log(e.message);
    }
}

async function deleteDay(id: number) {
    try {
        await useService('days').delete(id);

        await fetch();
    } catch (e: any) {
        console.log(e.message);
    }
}

const debouncedDay = useDebounceFn(async (data: any) => {
    await useService('days').patch(data.id, data);

    await fetch();
}, 1000)

const debouncedWeek = useDebounceFn(async (data: any) => {
    await useService('weeks').patch(data.id, data);

    await fetch();
}, 1000)

const debouncedCourse = useDebounceFn(async (data: any) => {
    await useService('courses').patch(id, data);

    await fetch();
}, 1000)


async function getFile(e: any) {
    const formData = new FormData();

    isLoading.value = true;

    formData.append('image', e.currentTarget.files[0]);

    try {
        await useService('courses').patch(currentItem.value.id, formData);
    } catch (e: any) {
        console.log(e);
    }

    await fetch();

    isLoading.value = false;
}

async function deleteCourse() {
    try {
        await useService('courses').delete(id);

        await useRouter().push('/');
    } catch (e: any) {
        console.log(e.message)
    }
}

</script>

<style scoped></style>