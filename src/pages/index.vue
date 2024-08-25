<template>
    <div>        
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    authRoute: true,
    middleware: 'auth'
});

await useRouter().push('/trainings');

</script>

<style scoped>

</style>