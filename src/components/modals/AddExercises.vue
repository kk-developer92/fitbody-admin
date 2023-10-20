<template>
    <modal id="addModal" @shown="shown">
        <div class="w-full h-screen flex items-center justify-end">
            <div class="bg-white w-1/4 h-screen rounded-l-lg overflow-y-scroll overflow-x-hidden">
                <div class="border-b p-4">
                    <cross-icon @click="emit('close')" class="cursor-pointer"/>
                </div>
                <div class="flex flex-col gap-5 p-4">
                    <div class="flex items-center" v-for="train in exercises">
                        <input type="checkbox" :checked="train.checked" class="w-4 h-4" @click="add($event, train)">
                        <div class="flex items-center ml-5 gap-2">
                            <img :src="train.image" class="w-10 h-10 rounded-md" alt="">
                            <p class="font-semibold text-lg">{{ train.title }}</p>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button @click.prevent="submit" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script setup lang="ts">

import CrossIcon from "assets/icons/CrossIcon.vue";
import axios from "axios";


const emit = defineEmits(['close', 'add'])
const url = import.meta.env.VITE_API_URL;
const exercises = ref([]);
const result: any = ref([]);

function shown(data: any) {
    result.value = data;
}

async function fetch() {
    const {data} = await axios.get(`${url}exercises`);
    exercises.value = data.data;
}


fetch();

function add(e: any, data: any) {
    data.checked = e.target.checked;
    if (data.checked) {
        result.value.push(data);
    } else {
        result.value.map((i: { _id: any; }, idx: number) => {
            if (data._id === i._id) {
                result.value.splice(idx, 1);
            }
        });
    }
    emit('add', result.value);
}

function submit() {
    emit('close');
}

</script>

<style scoped>

</style>