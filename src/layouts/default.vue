<template>
    <div class="w-[90%] mx-auto py-4">
        <div class="w-full">
            <div class="flex gap-3">
                <nuxt-link href="/" :class="{
                    'router-link-exact-active': isActive('courses')
                }">Курсы</nuxt-link>
                <nuxt-link href="/trainings" :class="{
                    'router-link-exact-active': isActive('trainings')
                }">Тренировка</nuxt-link>
                <nuxt-link href="/nutrition" :class="{
                    'router-link-exact-active': isActive('nutrition')
                }">Питание</nuxt-link>
                <nuxt-link href="/exercises" :class="{
                    'router-link-exact-active': isActive('exercises')
                }">Упражнения</nuxt-link>
                <nuxt-link href="/products" :class="{
                    'router-link-exact-active': isActive('products')
                }">Продукты</nuxt-link>
            </div>
        </div>
        <nuxt-page></nuxt-page>
    </div>
</template>

<script setup lang="ts">

const isActive = (route: string) => {
    const router = useRoute();

    return router.fullPath.includes(route);
}
</script>

<style scoped>

</style>