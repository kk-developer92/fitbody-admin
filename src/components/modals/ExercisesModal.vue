<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading"/>
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
                                <span>Категория</span>
                                <select
                                    class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                    v-model="currentItem.lang">
                                    <option value="ru">Русский</option>
                                    <option value="uz">Узбекский</option>
                                </select>
                            </label>
                            <label class="flex flex-col gap-1 w-full">
                                <span>Заголовок</span>
                                <input type="text"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="currentItem.title">
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <label class="flex flex-col gap-1 mt-4 w-full">
                                <span>Видео</span>
                                <input type="text"
                                       class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                       v-model="currentItem.video">
                            </label>
                            <label class="flex flex-col gap-1 mt-4 w-full">
                                <span>Категория</span>
                                <select
                                    class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
                                    v-model="currentItem.category">
                                    <option value="Грудь">Грудь</option>
                                    <option value="Спина">Спина</option>
                                    <option value="Трапеция">Трапеция</option>
                                    <option value="Бицепс">Бицепс</option>
                                    <option value="Трицепс">Трицепс</option>
                                    <option value="Ноги">Ноги</option>
                                    <option value="Плечи">Плечи</option>
                                    <option value="Ягодицы">Ягодицы</option>
                                    <option value="Пресс">Пресс</option>
                                    <option value="Кардио">Кардио</option>
                                </select>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between p-4 gap-2">
                    <button v-if="currentItem?.id" @click.prevent="deleteExercise"
                            class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Удалить
                    </button>
                    <button @click.prevent="save" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
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

const currentItem: any = ref({});
const errorMsg = ref('');
const showMsg = ref(false);
const formData = new FormData();
const isLoading = ref(false);
const emit = defineEmits(['fetch']);


async function shown(data: any) {
    const res = await useService('exercises').get(data.id);
    currentItem.value = res.data.data;
}

async function getFile(e: any) {
    isLoading.value = true;

    formData.append('image', e.currentTarget.files[0]);

    await useService('exercises').patch(currentItem.value.id, formData);

    emit('fetch');

    await shown({id: currentItem.value.id});

    isLoading.value = false;
}

async function save() {
    const modal = useModal('exercisesModal');

    await useService('exercises').patch(currentItem.value.id, currentItem.value);

    emit('fetch');

    modal.close();
}

async function deleteExercise() {
    const modal = useModal('exercisesModal');

    await useService('exercises').delete(currentItem.value.id);

    emit('fetch');

    modal.close();
}

</script>

<style scoped>

</style>