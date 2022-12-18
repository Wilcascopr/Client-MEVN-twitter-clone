<template>
    <div>
        <ScrollHeader :message="'Search User'" :user="user" id="brCell" v-if="user"
        @cellBar="backDrop = !backDrop"/>
        <TrendingTags/>
    </div>
</template>

<script setup>
import TrendingTags from '@/components/TrendingTags.vue';
import ScrollHeader from '@/components/ScrollHeader.vue';
import { ref } from 'vue';
import { useRefresh } from '@/composables/useUserMethods';

const { errorThreeU, refresh } = useRefresh();
const user = ref(null);

refresh()
    .then(data => user.value = data)
    .catch(err => console.log(err, errorThreeU.value))

const backDrop = ref(false);

</script>

<style>

</style>