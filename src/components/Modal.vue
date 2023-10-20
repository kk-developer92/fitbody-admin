<template>
    <transition name="form">
        <div v-if="open" :id="id" aria-hidden="true"
             class="w-full h-screen fixed top-0 left-0 bg-black/60"
             tabindex="-1">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts" setup>

import {bus} from "~/constants";
import CrossIcon from "assets/icons/CrossIcon.vue";

const props = defineProps({id: {type: String, required: true}, title: {type: String}});
const emits = defineEmits(['shown', 'hidden']);
const open = ref(false);

function closeModal() {
    open.value = false;
    emits('hidden');
}

bus.on('modals.open', ({id, data}: any) => {
    if (id === props.id) {
        open.value = true;
        emits('shown', data);
    }
});
bus.on('modals.close', ({id}) => {
    if (id === props.id) {
        closeModal();
    }
});

</script>

<style scoped>

.form-enter-active,
.form-leave-active {
    transition: all 0.25s ease-out;
}

.form-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.form-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}

.bg-opacity {
    opacity: .5;
}
</style>