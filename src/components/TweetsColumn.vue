<template>
    <div class="tweets-column">
        <ScrollHeader :message="'Home'" :user="user"
        @cellBar="backDrop = !backDrop"/>
        <div class="create-tweet" >
            <span>{{user.name}}</span>
            <createTweet 
            :accessToken="user.accessToken"
            @addTweet="addTweet"/>
        </div>
        <div v-if="tweets.length">
            <transition-group tag="ul" name="list">
                <li v-for="tweet in tweets" 
                :key="tweet._id"
                class="tweetscontainer">
                    <SingleTweet :tweet="tweet" :user="user"
                    :backDrop="backDrop" @responseE="backDrop = !backDrop"
                    @delete="tweets = tweets.filter(twt => twt._id !== tweet._id)"/>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { usegetTweets } from '@/composables/useTweetMethods';
import createTweet from './createTweet.vue';
import SingleTweet from './SingleTweet.vue';
import ScrollHeader from './ScrollHeader.vue';

export default {
    props: [ 'user'],
    components: { createTweet, SingleTweet,ScrollHeader },
    setup() {
        const tweets = ref([]);
        let page = 0;
        const backDrop = ref(false)

        const { errorOne, getTweets } = usegetTweets(0);

        setTimeout(() => {
            getTweets(page)
                .then(data => tweets.value = data)
                .catch(error => console.log(error))
        }, 1000);

        const loadmorePosts = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if ( (scrollTop + clientHeight) > (scrollHeight - 5)) {
                page += 20;
                getTweets(page)
                    .then(data => tweets.value = [...tweets.value, ...data])
                    .catch(error => console.log(error))
            }
        }
        
        onMounted(() => {
            window.addEventListener('scroll', loadmorePosts);
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', loadmorePosts);
        })

        const addTweet = (tweet) => {
            tweets.value.unshift(tweet)
        }

        return { errorOne, tweets, addTweet, backDrop }
    }

}
</script>

<style lang="scss">
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: scale(0.1);
    }

    .list-enter-active,
    .list-leave-active {
        transition: all 0.4s ease;
    }
    .tweets-column {
        width: 100%;
        .create-tweet {
            margin-top: 40px;
            width: 100%;
            padding: 10px 0;
            > span {
                font-size: 12px;
                margin-left: 20px;
            }
        }
    }
    
</style>