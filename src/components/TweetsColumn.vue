<template>
    <div class="tweets-column">
        <nav>
            <h3><span>Home</span></h3>
            <span>Symbol</span>
        </nav>
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
                    <SingleTweet :tweet="tweet" :user="user"/>
                </li>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { usegetTweets } from '@/composables/useTweetMethods';
import createTweet from './createTweet.vue';
import SingleTweet from './SingleTweet.vue';

export default {
    props: [ 'user'],
    components: { createTweet, SingleTweet },
    setup() {
        const tweets = ref([]);
        const page = 0;

        const { error, getTweets } = usegetTweets(0);

        onBeforeMount(() => {
            window.addEventListener('scroll', loadmorePosts())
        })

        onUnmounted(() => {
            window.removeEventListener('scroll', loadmorePosts())
        })


        const loadmorePosts = () => {
            console.log(document.documentElement.scrollHeight - document.documentElement.scrollTop)
        }

        setTimeout(() => {
            getTweets(page)
                .then(data => tweets.value = data)
                .catch(error => console.log(error))
        }, 1000);
        

        const addTweet = (tweet) => {
            tweets.value.unshift(tweet)
        }

        return { error, tweets, loadmorePosts, addTweet }
    }

}
</script>

<style scoped lang="scss">
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
        nav {
            width: 100%;
            position: sticky;
            top: 0;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            background: white;
            opacity: 80%;
        }
        .create-tweet {
            margin-top: 40px;
            width: 100%;
            padding: 10px 0;
            > span {
                font-size: 12px;
                margin-left: 20px;
            }
        }
        .tweetscontainer {
            padding: 1px 0;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
    }
    
</style>