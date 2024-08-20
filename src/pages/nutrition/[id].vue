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
                            <input type="number" @input="debouncedCourse(currentItem)"
                                class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                v-model="currentItem.price">
                        </label>
                        <div class="w-full">
                            <span>Пол</span>
                            <select @change="debouncedCourse(currentItem)" v-model="currentItem.type"
                                class="w-full border p-2 rounded-lg outline-none mt-1">
                                <option value="0">Мужской</option>
                                <option value="1">Женский</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Описание(ru)</span>
                        <ckeditor @input="debouncedCourse(currentItem)" :editor="editor"
                            v-model="currentItem.ruDescription" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Описание(uz)</span>
                        <ckeditor @input="debouncedCourse(currentItem)" :editor="editor"
                            v-model="currentItem.uzDescription" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>О программе(ru)</span>
                        <ckeditor @input="debouncedCourse(currentItem)" :editor="editor" v-model="currentItem.ruAbout"
                            :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>О программе(uz)</span>
                        <ckeditor @input="debouncedCourse(currentItem)" :editor="editor" v-model="currentItem.uzAbout"
                            :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="w-2/3 flex flex-col gap-4 p-4">
                <div class="flex flex-col gap-4">
                    <h1 class="text-3xl">Контент</h1>
                    <div v-for="week in currentItem.weeks" class="w-full flex flex-col gap-1 border p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex gap-2 items-center">
                                <b class="">Ru: </b>
                                <input type="text" class="text-2xl w-1/3 mb-2" v-model="week.ruTitle"
                                    @input="debouncedWeek(week)">
                            </div>

                            <div class="flex gap-2 items-center">
                                <b>Uz: </b>
                                <input type="text" class="text-2xl w-1/3 mb-2" v-model="week.uzTitle"
                                    @input="debouncedWeek(week)">
                            </div>
                            <cross-icon @click="deleteWeek(week.id)" class="cursor-pointer" />
                        </div>
                        <div v-for="days in week.days" class="border-t pt-2 mt-1 flex flex-col gap-2">
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
                        <button type="button" @click="addDay({ weekId: week.id, uzTitle: '', ruTitle: '', content: '' })"
                            class="text-red-600">Добавить прием пищи
                        </button>
                    </div>
                    <button type="button" @click="addWeek({ nutritionId: currentItem.id, uzTitle: '', ruTitle: '' })"
                        class="text-red-600 w-full">Добавить день
                    </button>
                </div>
                <div class="flex justify-end gap-4">
                    <button v-if="currentItem.id" @click.prevent="deleteNutrition"
                        class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Удалить
                    </button>
                    <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
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
import { useDebounceFn } from "@vueuse/core/index";

const currentItem: any = ref({ content: [] });
const editor = ref(ClassicEditor);
const editorConfig = ref({
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    }
});
const isLoading = ref(false);
const formData = new FormData();
const id: any = useRoute().params.id;

async function fetch() {
    const data = await useService('nutrition').get(id);

    currentItem.value = data.data.data;
}

fetch();

async function submit() {
    await useRouter().push('/nutrition');
}


async function getFile(e: any) {
    isLoading.value = true;

    formData.append('image', e.currentTarget.files[0]);

    await useService('nutrition').patch(currentItem.value.id, formData);

    isLoading.value = false;

    await fetch();
}


async function deleteNutrition() {
    isLoading.value = true;

    await useService('nutrition').delete(currentItem.value.id);

    await useRouter().push('/nutrition');

    isLoading.value = true;
}

async function addWeek(data: any) {
    await useService('weeks').create(data);

    await fetch();
}

async function addDay(data: any) {
    await useService('days').create(data);

    await fetch();
}

async function deleteWeek(id: any) {
    await useService('weeks').delete(id);

    await fetch();
}

async function deleteDay(id: any) {
    await useService('days').delete(id);

    await fetch();
}

const debouncedCourse = useDebounceFn(async (data: any) => {
    await useService('nutrition').patch(data.id, data);

    await fetch();
}, 1000)


const debouncedWeek = useDebounceFn(async (data: any) => {
    await useService('weeks').patch(data.id, data);

    await fetch();
}, 1000)

const debouncedDay = useDebounceFn(async (data: any) => {
    await useService('days').patch(data.id, data);

    await fetch();
}, 1000)

</script>

<style scoped></style>