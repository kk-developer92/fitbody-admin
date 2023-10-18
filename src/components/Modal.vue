<template>
    <transition name="form">
        <div v-if="open" :id="id" aria-hidden="true"
             class="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-black/60"
             tabindex="-1">
            <div class="w-1/2 h-full rounded-lg bg-white md:h-auto flex flex-col gap-3">
                <div class="w-full flex items-center justify-between p-4 border-b border-gray-300">
                    <slot name="title"/>
                    <button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200" @click="closeModal">
                        <cross-icon/>
                    </button>
                </div>
                <div class="p-4">
                    <slot name="main"/>
                </div>
                <div class="p-4 flex justify-end">
                    <button class="p-2 px-6 bg-red-600 rounded-lg text-white mt-5">
                        Сохранить
                    </button>
                </div>
            </div>
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