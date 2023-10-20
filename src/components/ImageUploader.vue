<template>
    <span class="group w-full relative cursor-pointer hover:text-white block">
        <img class="w-full h-full rounded-xl object-cover" :src="props.image" alt="">
        <span
            class="absolute rounded-xl top-0 left-0 text-white w-full h-full bg-[#00000080] text-3xl whitespace-nowrap flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
            <span class="flex flex-col items-center gap-2">
                <upload-icon class="w-10 h-10"/>
                Загрузить картинку
            </span>
        </span>
    </span>
</template>

<script setup lang="ts">

import UploadIcon from "assets/icons/UploadIcon.vue";

const props = defineProps<{ image: string }>();
</script>


<style>

</style>