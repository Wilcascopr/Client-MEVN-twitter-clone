<template>
  <div class="homepage">
    <div class="left-side" v-if="user">
        <img src="../assets/logo.png">
        <userCloud :user="user"/>
    </div>
    <div class="tweets" v-if="user">
        <TweetsColumn :user="user"/>
    </div>
    <div class="right-side">
        <TrendingTags />
    </div>
  </div>
</template>

<script>
import { useRefresh } from '@/composables/useUserMethods';
import TweetsColumn from '@/components/TweetsColumn.vue';
import userCloud from '@/components/userCloud.vue';
import TrendingTags from '@/components/TrendingTags.vue';
import { ref } from 'vue';

export default {
    setup() {
        const { error, refresh } = useRefresh();
        const user = ref(null);

        refresh()
            .then(data => {
                user.value = data;
            })
            .catch(err => console.log(err));


        return { error, user };
    },
    components: { TweetsColumn, userCloud, TrendingTags }
}
</script>

<style lang="scss">
.left-side {
    position: sticky;
    top:0;
    width: 25%;
    height: 100%;
    span {
        cursor: pointer;
        font-weight: bold;
    }
    > img {
        width: 45px;
        height: 45px;
        margin: 12px;
    }
}
.right-side {
    position: sticky;
    top:0;
    width: 25%;
    height: 100%;
}
.tweets {
    width: 44%;
    margin: 0;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
}
.homepage {
    display: flex;
    margin: 0 3%;
}

@media screen and (max-width: 500px) {
    .left-side, .right-side {
        visibility: hidden;
        position: fixed;
    }
}
</style>