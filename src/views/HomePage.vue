<template>
  <div class="homepage">
    <div class="left-side">
        <userCloud :user="user"/>
    </div>
    <div class="tweets">
        <TweetsColumn :tweets="tweets" :user="user"/>
    </div>
    <div class="right-side">
        right
    </div>
  </div>
</template>

<script>
import useRefresh from '@/composables/useRefresh'
import TweetsColumn from '@/components/TweetsColumn.vue';
import userCloud from '@/components/userCloud.vue'
import { ref } from 'vue';

export default {
    setup() {
        const { error, refresh } = useRefresh();
        const user = ref(null);
        const tweets = ref(null);

        refresh().then(data => user.value = data).catch(err => console.log(err));
        tweets.value = ['1 tweet', '1 tweet', '1 tweet', '1 tweet', '1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet','1 tweet']

        return { error, user, tweets };
    },
    components: { TweetsColumn, userCloud }
}
</script>

<style lang="scss">
.left-side {
    width: 25%;
    height: 100%;
    span {
        cursor: pointer;
        font-weight: bold;
    }
}
.right-side {
    width: 25%;
    height: 100%;
}
.tweets {
    width: 500px;
}
.homepage {
    display: flex;
}
</style>