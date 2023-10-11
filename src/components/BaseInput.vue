<template>
    <label class="flex flex-col gap-1 w-full">
        <span>{{ props.label }}</span>
        <input :type="props.type || 'text'" class="border p-2 rounded-lg outline-none" v-model="props.value">
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{ value: string, label: string, type?: string }>()
</script>

<style scoped>

</style>