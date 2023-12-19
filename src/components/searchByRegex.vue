<template>
    <div class="flex items-center gap-4">
        <input type="text"
               class="border p-2 rounded-lg outline-none focus:border-2 focus:border-red-500"
               v-model="searchValue" placeholder="Поиск">
        <button @click="emit('search', searchValue)" class="p-2 px-6 border bg-red-600 rounded-lg text-white">
            Поиск
        </button>
        <select v-model="selectValue" @change="emit('search', selectValue)"
                class="w-full border p-2 rounded-lg outline-none">
            <option value="men">Мужской</option>
            <option value="women">Женский</option>
            <option value="">Все</option>
        </select>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['search']);

const searchValue = ref('');
const selectValue = ref('');
</script>

<style scoped>

</style>