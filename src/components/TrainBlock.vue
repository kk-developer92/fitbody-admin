<template>
    <nuxt-link class="rounded-xl relative" v-for="course in props.courses" :href="'courses/' + course?._id">
        <img :src="course.image" class="rounded-xl w-full h-72 object-cover" alt="">
        <div class="absolute bottom-4 left-4 font-medium">
            <span class="text-white text-xl">{{ course.title }}</span>
        </div>
        <div class="absolute top-4 right-4 font-medium bg-red-600 px-2 rounded-md">
            <span class="text-white text-sm">
                {{ course.type }}
            </span>
        </div>
    </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps<{ courses: any }>()
</script>

<style scoped>

</style>