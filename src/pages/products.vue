<template>
    <div>
        <div class="flex justify-end">
            <button @click="createProdcut()" class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                Добавить
            </button>
        </div>
        <div class="flex flex-col mt-6">
            <table class="table-fixed border-collapse border border-slate-200 w-full">
                <thead>
                    <tr>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-10">ID</th>
                        <th class="text-left border-collapse border border-slate-200 p-2">Названия (ru)</th>
                        <th class="text-left border-collapse border border-slate-200 p-2">Названия (uz)</th>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-28">Количество</th>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-24">Белок (г)</th>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-24">Жир (г)</th>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-28">Углевод (г)</th>
                        <th class="text-left border-collapse border border-slate-200 p-2 !w-24">Калории</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="i in products">
                        <td class="p-2 border-collapse border border-slate-200">{{ i.id }}</td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.ruName" @input="updateProduct(i)" type="text"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.uzName" @input="updateProduct(i)" type="text"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.count" @input="updateProduct(i)" type="number"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.protein" @input="updateProduct(i)" type="number"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.fat" @input="updateProduct(i)" type="number"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.Carbohydrates" @input="updateProduct(i)" type="number"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                        <td class="border-collapse border border-slate-200">
                            <input v-model="i.calories" @input="updateProduct(i)" type="number"
                                class="w-full p-2 rounded-lg outline-none focus:border-2 focus:border-red-500">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';

const products = ref(await fetchProducts());

async function createProdcut() {
    await useService('products').create({});

    products.value = await fetchProducts();
}

async function fetchProducts() {
    const res = await useService('products').find();


    return res.data.data.sort((a: any, b: any) => a.id - b.id);
}

const updateProduct = useDebounceFn(async (data: any) => {
    data.calories = ((data.protein + data.Carbohydrates) * 4) + (data.fat * 9);

    await useService('products').patch(data.id, data);
}, 1000)
</script>