<template>
    <loading class="absolute w-full h-screen top-0 left-0" v-if="isLoading"/>
    <div class="w-full h-screen flex items-center justify-center">
        <form class="p-4 border rounded-md w-[95%] sm:w-2/3 md:w-1/3" @submit.prevent="login">
            <h1 class="text-4xl font-medium text-red-500">Войти</h1>
            <div class="w-full text-red-500 p-2 py-4 bg-red-200 border border-red-500 rounded-md mt-4"
                 v-if="error.length">
                {{ error }}
            </div>
            <div class="mt-4 flex flex-col-reverse">
                <input v-model="user.email" type="text" class="border p-2 rounded-md outline-none w-full"
                       id="floatingInput"
                       placeholder="Номер телефона">
                <label for="floatingInput">Почта</label>
            </div>
            <div class="mt-4 flex flex-col-reverse">
                <input v-model="user.password" type="password" class="border p-2 rounded-md outline-none w-full"
                       id="floatingSet"
                       placeholder="Пароль">
                <label for="floatingSet">Пароль</label>
            </div>
            <div class="flex justify-end">
                <button type="submit" class="p-3 px-10 bg-red-600 rounded-lg text-white mt-5">Войти</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

import useService from "~/utils/useService";

definePageMeta({
    layout: false
});

const user: any = ref({
    email: '',
    password: ''
});
const isLoading = ref(false);

const error = ref('');
const url = import.meta.env.VITE_API_URL;

async function login() {
    isLoading.value = true;
    if (user.value.email === '' || user.value.password === '') {
        return error.value = 'Заполните все поля';
    }
    const token = useCookie('fbt');

    token.value = '';

    let response;

    try {
        response = await useService('admins/signin').create(user.value);

        token.value = response.data.accessToken;
        navigateTo('/trainings');
    } catch (e: any) {
        error.value = e.response.data.message;
    } finally {
        isLoading.value = false;
    }

}

</script>

<style scoped>

</style>