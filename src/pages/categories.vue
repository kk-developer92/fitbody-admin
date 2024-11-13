<template>
    <div>
        <div class="flex justify-end">
            <button @click="createCategory()" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
        </div>
        <div class="w-full grid grid-cols-3 gap-4 select-none">
            <table class="table-fixed border-collapse border border-slate-200 w-full">
                <thead>
                    <tr>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-10">ID</th>
                        <th class="text-left border-collapse border border-slate-200 p-2">Названия</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="category in categories">
                        <td class="p-2 border-collapse border border-slate-200">{{ category.id }}</td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="category.name" @input="updateCategory(category)" type="text"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>

const categories: any = ref([]);

async function fetch() {
    const data = await useService('categories').find();

    categories.value = data.data.sort((a: any, b: any) => a.id - b.id);
}

fetch();

async function createCategory() {
    await useService('categories').create({ name: '' });

    await fetch();
}

async function updateCategory(category: any) {
    await useService('categories').patch(category.id, { name: category.name });
}
</script>