<template>
    <modal id="addModal" @shown="shown">
        <div class="w-full h-screen flex items-center justify-end">
            <div class="bg-white w-1/4 h-screen rounded-l-lg overflow-y-scroll overflow-x-hidden">
                <div class="border-b p-4">
                    <cross-icon @click="emit('close')" class="cursor-pointer" />
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
                    <div v-if="!categories.length">
                        <h1 class="text-center text-2xl mt-6">Тут пока пусто</h1>
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

const emit = defineEmits(['close', 'fetch'])
const exercises: any = ref([]);
const categories: any = ref([]);
const dayList: any = ref({});
const lang = ref('ru');

function shown(data: any) {
    fetch();
    dayList.value = data.data;
    lang.value = data.lang;
}

async function fetch() {
    const { data } = await useService('exercises').find();

    exercises.value = data.data.filter((item: any) => item.lang === lang.value);

    let exercise: any;

    for (exercise of exercises.value) {
        if (!categories.value.includes(exercise?.category)) {
            categories.value.push(exercise?.category);
        }
    }
}


async function addToResult(data: any) {
    const body = {
        exerciseId: data.id,
        dayListId: dayList.value.dayListId,
        reps: '1x10-15'
    }

    await useService('exercise-mtm').create(body);
}

async function deleteResult(data: any) {
    const res = await useService('exercise-mtm').find({
        exerciseId: +data.id,
        dayListId: dayList.value.dayListId,
        reps: '1x10-15'
    });

    await useService('exercise-mtm').delete(res.data.data.at(-1).id);
}


async function submit() {
    emit('close');
    emit('fetch');
}

</script>

<style scoped></style>