<template>
<div>
    <div class="homepage" v-if="user && tweet">
        <div class="left-side" v-if="user">
            <img src="../assets/logo.png">
            <userCloud :user="user"/>
        </div>
        <div class="tweets" v-if="user">
            <ScrollHeader :message="''" :user="user" id="brCell"
            @cellBar="backDrop = !backDrop">
                <nav class="nav">
                    <span class="material-symbols-outlined" @click="$router.go(-1)">arrow_back</span>
                    <span>Thread</span>
                </nav>
            </ScrollHeader>
            <nav class="nav Normal">
                <span class="material-symbols-outlined" @click="$router.go(-1)">arrow_back</span>
                <span>Thread</span>
            </nav>
            <SingleTweet v-if="tweet" :tweet="tweet" :user="user" 
            :backDrop="backDrop" @responseE="backDrop = !backDrop"
            @delete="$router.push({ name: 'homepage' })"/>
            <transition-group tag="ul" name="list" v-if="Rtweets.length">
                <li v-for="tweet in Rtweets" 
                :key="tweet._id"
                class="tweetscontainer">
                    <SingleTweet 
                    :tweet="tweet" :user="user"
                    :backDrop="backDrop" @responseE="backDrop = !backDrop"
                    @delete="deleteR()"/>
                </li>
            </transition-group>
        </div>
        <div class="right-side">
            <TrendingTags />
        </div>
   </div>
   <div class="loading" v-else></div>
</div>
   
</template>

<script>
import SingleTweet from '@/components/SingleTweet.vue';
import userCloud from '@/components/userCloud.vue';
import TrendingTags from '@/components/TrendingTags.vue';
import { usegetTweet,  userGetReplyTweets } from '@/composables/useTweetMethods';
import { useRefresh } from '@/composables/useUserMethods';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ScrollHeader from '@/components/ScrollHeader.vue';
 

export default {
    props: ["id"],
    components: { SingleTweet, userCloud, TrendingTags, ScrollHeader },
    setup(props) {
        const tweet = ref(null);
        const Rtweets = ref([]);
        const user = ref(null);
        const backDrop = ref(false);
        const router = useRouter();

        const { errorSix, getTweet } = usegetTweet();
        const { errorSeven, getReplyTweets } = userGetReplyTweets();
        const { errorThreeU, refresh } = useRefresh();

        setTimeout(async () => {
            const resU = await refresh();
            if (!errorThreeU.value) { user.value = resU }
            if (!user.value) { router.push({ name: 'landing' }) }
            const res = await getTweet(props.id)
            if (!errorSix.value) {
                tweet.value = res;
                const resRT = await getReplyTweets(tweet.value.comments);
                if (!errorSeven.value) Rtweets.value = resRT;
            }
        }, 1000); 

        const deleteR = () => {
            setTimeout(async () => {
                const res = await getTweet(props.id)
                tweet.value = res;
                const resRT = await getReplyTweets(tweet.value.comments);
                if (!errorSeven.value) Rtweets.value = resRT;
            }, 300);
        }

        return { tweet, user, Rtweets, backDrop, deleteR}
    }
}
</script>

<style lang="scss">
    #brCell {
        display: none;
    }
    .nav {
        position: sticky;
        top: 0;
        padding: 10px;
        display: flex;
        align-items: center;
        background: white;
        opacity: 0.8;
        .material-symbols-outlined {
            border-radius: 50%;
            margin: 0 10px;
            font-size: 1.5em;
        }
        .material-symbols-outlined:hover {
            background: lightgray;
        }
    }
    .cellBar {
        * {
            z-index: 0;
            .backDrop {
                z-index: 1;
                * {
                    z-index: 1;
                }
            }
        }
    }
</style>