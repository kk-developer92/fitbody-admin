<template>
    <div class="box">
        <span>{{ text || 'Что то пошло не так :(' }}</span>
        <cross-icon @click="emit('close')"/>
    </div>
</template>

<script setup lang="ts">

import CrossIcon from "~/components/icons/CrossIcon.vue";

const {text} = defineProps<{ text: string }>();
const emit = defineEmits(['close']);

</script>

<style scoped lang="css">
.box {
    color: #F52626;
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    background: rgba(255, 0, 0, 0.1);
    border: 1px solid red;

    svg {
        cursor: pointer;
    }
}
</style>