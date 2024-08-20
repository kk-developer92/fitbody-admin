<template>
    <nuxt-link class="rounded-xl relative shadow" v-for="course in props.courses"
               :href="`${props.path}/` + course?.id">
        <img :src="course.image" class="rounded-xl w-full h-72 object-cover" alt="">
        <div class="absolute bottom-4 left-4 font-medium">
            <span class="text-white text-xl">{{ course.ruTitle }}</span>
        </div>
        <div class="absolute top-4 right-4 font-medium bg-red-600 px-2 rounded-md">
            <span class="text-white text-sm">
                {{ type[course.type] }}
            </span>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{ courses: any, path: string }>();

const type = ref({
    0: 'мужской',
    1: 'женский'
})
</script>

<style scoped>
.shadow {
    -webkit-box-shadow: 0px -19px 26px 22px rgba(34, 60, 80, 0.2) inset;
    -moz-box-shadow: 0px -19px 26px 22px rgba(34, 60, 80, 0.2) inset;
    box-shadow: 0px -19px 26px 22px rgba(34, 60, 80, 0.2) inset;
}
</style>