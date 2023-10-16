<template>
    <div class="w-full py-6 gap-4">
        <course-form :id="id" path="trainings"/>
    </div>
</template>

<script setup lang="ts">

import CourseForm from "~/components/forms/CourseForm.vue";

const id = useRoute().params.id;

</script>

<style scoped>

</style>