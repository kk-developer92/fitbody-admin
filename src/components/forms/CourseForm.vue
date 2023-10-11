<template>
    <div>
        <form>
            <div class="w-1/2 flex flex-col gap-4">
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
                    <div class="w-full flex flex-col gap-1">
                        <span>Краткое описание</span>
                        <editor v-model="course.shortDescription"/>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <span>Описание</span>
                        <editor v-model="course.description"/>
                    </div>
                </div>
                <!--                <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">-->
                <!--                    Сохранить-->
                <!--                </button>-->
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">


import axios from "axios";
import BaseInput from "~/components/BaseInput.vue";
import ImageUploader from "~/components/ImageUploader.vue";

const props = defineProps<{ id: any }>();
const course = ref({});
const url = import.meta.env.VITE_API_URL;

async function fetch() {
    const {data} = await axios.get(url + 'courses/' + props.id);
    course.value = data;
}

if (props.id) {
    fetch();
}
</script>

<style scoped>

</style>