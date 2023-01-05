<template>
    <div>
        <div class="homepage" v-if="user" >
            <div class="left-side" >
                <img src="../assets/logo.png">
                <userCloud :user="user"/>
            </div>
            <div class="tweets">
                <TweetsColumn :user="user"/>
            </div>
            <div class="right-side">
                <TrendingTags />
            </div>
        </div>
        <div v-if="!user" class="loading" ></div>
    </div>
</template>

<script>
import { useRefresh } from '@/composables/useUserMethods';
import TweetsColumn from '@/components/TweetsColumn.vue';
import userCloud from '@/components/userCloud.vue';
import TrendingTags from '@/components/TrendingTags.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { errorThreeU, refresh } = useRefresh();
        const user = ref(null);
        const router = useRouter();

        setTimeout(() => {
            refresh()
            .then(data => {
                user.value = data;
                if (!user.value) router.push({ name: 'landing' })
            })
            .catch(err => console.log(err)); 
        }, 700);


        return { errorThreeU, user };
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
    font-size: 20px;
    width: 44%;
    margin: 0 3%;
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
}
.homepage {
    display: flex;
    margin: 0 3%;
}
</style>