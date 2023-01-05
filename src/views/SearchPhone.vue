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
import { useRouter } from 'vue-router';

const { errorThreeU, refresh } = useRefresh();
const router = useRouter();
const user = ref(null);

refresh()
    .then(data => {
        user.value = data;
        if (!user.value) router.push({ name: 'landing' });
    })
    .catch(err => console.log(err, errorThreeU.value))

const backDrop = ref(false);

</script>

<style>

</style>