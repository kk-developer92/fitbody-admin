<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <!--            <search-by-regex @search="searchIt"/>-->
            <button @click="createTraining" class="p-2 px-6 bg-red-600 rounded-lg text-white">
                Добавить
            </button>
        </div>
        <div v-if="courses.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <train-block :courses="courses" path="trainings"/>
        </div>
        <div v-else class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Loader from "~/components/Loader.vue";
import TrainBlock from "~/components/TrainBlock.vue";

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

const courses = ref([]);


async function fetch() {
    const {data} = await useService('trainings').find();
    courses.value = data.data;
}

async function createTraining() {
    try {
        const res = await useService('trainings').create({});

        await useRouter().push(`/trainings/${res.data.id}`);
    } catch (e: any) {
        console.log(e.message);
    }
}


fetch();
</script>

<style scoped>

</style>