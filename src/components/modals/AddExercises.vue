<template>
    <modal id="addModal" @shown="shown">
        <div class="w-full h-screen flex items-center justify-end">
            <div class="bg-white w-1/4 h-screen rounded-l-lg overflow-y-scroll overflow-x-hidden">
                <div class="border-b p-4">
                    <cross-icon @click="emit('close')" class="cursor-pointer"/>
                </div>
                <div class="flex flex-col gap-5 p-4">
                    <div class="flex flex-col gap-2" v-for="category in categories">
                        <h1 class="text-2xl mb-2">{{ category }}</h1>
                        <div v-for="train in exercises" class="flex items-center" :class="{
                        'hidden': train.category !== category
                    }">
                            <input type="checkbox" class="w-4 h-4"
                                   @click="!$event.target.checked ? deleteResult(train) : addToResult(train)">
                            <div class="flex items-center ml-5 gap-2">
                                <img :src="train.image" class="w-10 h-10 rounded-md" alt="">
                                <p class="font-semibold text-lg">{{ train.title }}</p>
                            </div>
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
import {v4 as uuidv4} from 'uuid';


const emit = defineEmits(['close'])
const exercises: any = ref([]);
let result: any = ref([]);
const categories: any = ref([]);

function shown(data: any) {
    fetch();
    result.value = data;
}

async function fetch() {
    const {data} = await useService('exercises').find();

    exercises.value = data.data;

    let exercise: any;

    for (exercise of exercises.value) {
        if (!categories.value.includes(exercise?.category)) {
            categories.value.push(exercise?.category);
        }
    }
}


function addToResult(data: any) {
    result.value.push({...data, exerciseId: data._id, reps: '1x10-15', uniqueId: uuidv4()});
    console.log(result.value);
}

function deleteResult(data: any) {
    result.value.splice(result.value.indexOf(data), 1);
}

function submit() {
    emit('close');
}

</script>

<style scoped>

</style>