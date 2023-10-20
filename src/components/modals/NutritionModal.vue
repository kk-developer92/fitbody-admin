<template>
    <modal id="nutritionModal" @shown="shown">
        <div class="w-full h-screen flex items-center justify-center">
            <form class="bg-white w-1/2 h-[700px] rounded-lg overflow-y-scroll overflow-x-hidden">
                <div class="flex justify-end border-b p-4">
                    <cross-icon @click="useModal('nutritionModal').close()" class="cursor-pointer"/>
                </div>
                <div class="p-4">
                    <div v-if="showMsg"
                         class="border border-red-600 bg-red-100 w-full rounded-lg flex items-center justify-between p-5">
                        <p>{{ errorMsg }}</p>
                        <cross-icon @click="showMsg=false" class="cursor-pointer text-red-600"/>
                    </div>
                </div>
                <div class="p-4">
                    <label class="w-full">
                        <image-uploader class="w-full h-96" :image="currentItem.image"/>
                        <input type="file"
                               @change="emit('getFile', $event, currentItem)"
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
                                <select v-model="currentItem.type"
                                        class="w-full border p-2 rounded-lg outline-none mt-1">
                                    <option value="men">Мужской</option>
                                    <option value="women">Женский</option>
                                </select>
                            </div>
                        </div>
                        <div v-if="currentItem.description" class="w-full flex flex-col gap-1">
                            <span>Описание</span>
                            <ckeditor :editor="editor" v-model="currentItem.description"
                                      :config="editorConfig"></ckeditor>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end p-4">
                    <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script setup lang="ts">

import CrossIcon from "assets/icons/CrossIcon.vue";
import {useModal} from "~/compasables/useModal";
import ImageUploader from "~/components/ImageUploader.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const currentItem: any = ref({});
const editor = ref(ClassicEditor);
const editorConfig = ref({
    language: 'ru'
});
const errorMsg = ref('');
const showMsg = ref(false);
const emit = defineEmits(['getFile']);

function shown(data: any) {
    currentItem.value = data;
}

function submit() {
    try {
        axios.patch(`${url}nutrition/${currentItem.value._id}`, currentItem.value);
        useModal('nutritionModal').close();
    } catch (e) {
        showMsg.value = true;
        errorMsg.value = 'Что-то пошло не так!'
    }
}

</script>

<style scoped>

</style>