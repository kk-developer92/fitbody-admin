<template>
    <ckeditor :editor="editor" v-model="data" :config="editorConfig"></ckeditor>
</template>

<script setup lang="ts">
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps<{ modelValue: string }>();
const editor = ref(ClassicEditor);
const data = ref(props.modelValue || '');
const editorConfig = ref({
    language: 'ru'
});
</script>

<style>
.ck-editor__editable {
    height: 200px !important;
}
</style>