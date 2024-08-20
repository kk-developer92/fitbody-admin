<template>
    <div>
        <div class="flex justify-between items-center mt-5">
            <!--            <search-by-regex/>-->
            <button @click="createCourse" class="p-2 px-6 bg-red-600 rounded-lg text-white">
                Добавить
            </button>
        </div>
        <div v-if="courses.data.data.length" class="w-full grid md:grid-cols-2 lg:grid-cols-3 py-6 gap-4">
            <train-block :courses="courses.data.data" path="courses"/>
        </div>
        <div v-else class="w-full flex items-center justify-center py-12">
            <loader class="!text-gray-300"/>
        </div>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

const courses = await useService('courses').find();

async function createCourse() {
    try {
        const res = await useService('courses').create({});

        await useRouter().push(`/courses/${res.data.id}`);
    } catch (e: any) {
        console.log(e.message);
    }
}

</script>

<style scoped>

</style>