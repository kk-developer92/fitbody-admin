<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading"/>
    <div class="w-full flex items-center justify-center">
        <form class="w-full rounded-lg flex">
            <div class="p-4 pl-0 w-1/3">
                <label class="w-full">
                    <image-uploader class="w-full h-96" :image="currentItem.image"/>
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
                                   v-model="currentItem.title">
                        </label>
                        <label class="flex flex-col gap-1 w-full">
                            <span>Цена</span>
                            <input type="number"
                                   class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                   v-model="currentItem.price">
                        </label>
                        <div class="w-full">
                            <span>Пол</span>
                            <select v-model="currentItem.type" class="w-full border p-2 rounded-lg outline-none mt-1">
                                <option value="men">Мужской</option>
                                <option value="women">Женский</option>
                            </select>
                        </div>
                        <div class="w-full">
                            <span>Сложность</span>
                            <select v-model="currentItem.complexity"
                                    class="w-full border p-2 rounded-lg outline-none mt-1">
                                <option value="beginner">Начинаюший</option>
                                <option value="advanced">Продвинутый</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Краткое описание</span>
                        <ckeditor :editor="editor" v-model="currentItem.shortDescription"
                                  :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>О программе</span>
                        <ckeditor :editor="editor" v-model="currentItem.about_program"
                                  :config="editorConfig"></ckeditor>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Описание</span>
                        <ckeditor :editor="editor" v-model="currentItem.description" :config="editorConfig"></ckeditor>
                    </div>
                </div>
            </div>
            <div class="w-2/3 flex flex-col gap-4 p-4">
                <div class="flex flex-col gap-4">
                    <h1 class="text-3xl">Контент</h1>
                    <div v-for="(content, idx) in currentItem.content"
                         class="w-full flex flex-col gap-1 border p-4 rounded-lg">
                        <div class="flex items-center justify-between">
                            <input type="text" class="text-2xl w-1/3 mb-2" v-model="content.title">
                            <cross-icon
                                @click="deleteBlock(currentItem.content, idx)"
                                class="cursor-pointer"/>
                        </div>
                        <div v-for="(days, index) in content.days" class="border-t pt-2 mt-1">
                            <div class="flex items-center justify-between mb-2">
                                <input type="text" class="text-lg w-1/3" v-model="days.title">
                                <cross-icon
                                    @click="deleteBlock(content.days, index)"
                                    class="cursor-pointer"/>
                            </div>
                            <ckeditor :editor="editor" v-model="days.content"
                                      :config="editorConfig"></ckeditor>
                        </div>
                        <button type="button"
                                @click="addContent(currentItem.content[idx].days, {title: 'Курс 1', content: 'Что-то'})"
                                class="text-red-600">Добавить блок
                        </button>
                    </div>
                    <button type="button" @click="addContent(currentItem.content, {title: 'День', days: []})"
                            class="text-red-600 w-full">Добавить день
                    </button>
                </div>
                <div class="flex justify-end gap-4">
                    <button v-if="currentItem._id" @click.prevent="deleteNutrition"
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

const currentItem: any = ref({content: []});
const editor = ref(ClassicEditor);
const editorConfig = ref({
    language: 'ru',
    mediaEmbed: {
        previewsInData: true
    }
});
const isLoading = ref(false);
const errorMsg = ref('');
const showMsg = ref(false);
const formData = new FormData();
const id: any = useRoute().params.id;

async function fetch() {
    const data = await useService('courses').get(id);
    currentItem.value = data.data;
}

if (id !== 'create') {
    fetch();
}

async function submit() {
    isLoading.value = true;

    if (id === 'create') {
        await useService('courses').create(currentItem.value);
        isLoading.value = false;
        useRouter().back();
        return;
    }

    try {
        await useService('courses').patch(currentItem.value._id, currentItem.value);
        useRouter().back();
    } catch (e) {
        showMsg.value = true;
        errorMsg.value = 'Что-то пошло не так!'
    }
    isLoading.value = false;
}


async function getFile(e: any) {
    isLoading.value = true;
    formData.append('image', e.currentTarget.files[0]);

    if (id === 'create') {
        const res = await useService('courses').create(formData);
        await useService('courses').patch(res.data._id, currentItem.value);
        isLoading.value = false;
        window.location.href = `https://admin.fitbody.uz/nutrition/${res.data._id}`;
        return;
    }

    const res = await useService('courses').patch(currentItem.value._id, formData);

    currentItem.value.image = res.data.image;
    isLoading.value = false;

    isLoading.value = false;
}


async function deleteNutrition() {
    isLoading.value = true;
    await useService('courses').delete(currentItem.value._id);
    useRouter().back();
    isLoading.value = true;
}

function addContent(arr: any, data: any) {
    arr.push(data);
}

function deleteBlock(data: any, idx: any) {
    data.splice(idx, 1);
}
</script>

<style scoped>

</style>