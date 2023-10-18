<template>
    <modal id="weekModal" @shown="shown">
        <template #title>
            <span class="text-2xl font-semibold">Добовить неделью</span>
        </template>
        <template #main>
            <h1>Main</h1>
        </template>
    </modal>
</template>

<script setup lang="ts">

function shown() {
}

</script>

<style scoped>

</style>