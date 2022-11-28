<template>
    <div class="tweets-column">
        <nav>
            <h2>Home</h2>
            <span>Symbol</span>
        </nav>
        <div class="create-tweet">
            <createTweet />
        </div>
        <div v-for="tweet in tweets" :key="tweet.id">
            <SingleTweet />
        </div>
    </div>
</template>

<script>
import createTweet from './createTweet.vue';
import SingleTweet from './SingleTweet.vue';

export default {
    props: ['tweets', 'user'],
    components: { createTweet, SingleTweet }
}
</script>

<style scoped lang="scss">
    .tweets-column {
        width: 100%;
        nav {
            width: 500px;
            position: fixed;
            top: 0;
            margin: 0;
            display: flex;
            align-items: center;
            height: 40px;
            background: white;
            opacity: 80%;
            h2 {
                margin-right: 300px;
            }
        }
        .create-tweet {
            margin-top: 40px;
        }
    }
</style>