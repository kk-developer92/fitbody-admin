<template>
    <modal id="exercisesModal" @shown="shown">
        <div class="w-full h-screen flex items-center justify-center">
            <form class="bg-white w-1/2 rounded-lg">
                <div class="flex justify-end border-b p-4">
                    <cross-icon @click="useModal('exercisesModal').close()" class="cursor-pointer"/>
                </div>
                <div class="p-4">
                    <div v-if="showMsg"
                         class="border border-red-600 bg-red-100 w-full rounded-lg flex items-center justify-between p-5">
                        <p>{{ errorMsg }}</p>
                        <cross-icon @click="showMsg=false" class="cursor-pointer text-red-600"/>
                    </div>
                </div>
                <div class="p-4 flex gap-10">
                    <label>
                        <image-uploader class="w-60 h-60" :image="currentItem.image"/>
                        <input type="file" @change="getFile" class="hidden">
                    </label>
                    <div class="">
                        <div class="grid grid-cols-2 gap-4">
                            <label class="flex flex-col gap-1 w-full">
                                <span>Название</span>
                                <input type="text"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="currentItem.name">
                            </label>
                            <label class="flex flex-col gap-1 w-full">
                                <span>Заголовок</span>
                                <input type="text"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="currentItem.title">
                            </label>
                        </div>
                        <label class="flex flex-col gap-1 mt-4 w-full">
                            <span>Видео</span>
                            <input type="text"
                                   class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                   v-model="currentItem.video">
                        </label>
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

import {useModal} from "~/compasables/useModal";
import CrossIcon from "assets/icons/CrossIcon.vue";
import ImageUploader from "~/components/ImageUploader.vue";
import axios from "axios";

const currentItem: any = ref({});
const errorMsg = ref('');
const showMsg = ref(false);
const url = import.meta.env.VITE_API_URL;
const formData = new FormData();

function shown(data: any) {
    currentItem.value = data;
}

async function submit() {
    formData.append('name', currentItem.value.name);
    formData.append('title', currentItem.value.title);
    formData.append('video', currentItem.value.video);
    if (!currentItem.value._id) {
        await axios.post(`${url}exercises`, formData);
    }

    try {
        axios.patch(`${url}exercises/${currentItem.value._id}`, formData);
        useModal('exercisesModal').close();
    } catch (e) {
        showMsg.value = true;
        errorMsg.value = 'Что-то пошло не так!'
    }
}

function getFile(e: any) {
    formData.append('image', e.currentTarget.files[0]);
}

</script>

<style scoped>

</style>