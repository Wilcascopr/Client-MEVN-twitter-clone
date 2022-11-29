<template>
    <div>
        <form @submit.prevent="handlenNewTweet">
            <input type="text" v-model="text" placeholder="What's happening?">
            <button>Tweet</button>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import useCrateTweet from '@/composables/useCreateTweet';

  export default {
    props: ['accessToken'],
    setup(props, context) {
        const { error, createTweet } = useCrateTweet();
        const text = ref('');
        const tags = ref ([]);

        const handlenNewTweet = async() => {
            const tweet = await createTweet({ text: text.value, tags: tags.value }, props.accessToken)
            if (!error.value) {
                text.value = ''
                context.emit('addTweet', tweet)
            }
        }

        return { text, handlenNewTweet, tags }
    }
  }
</script>
  
<style scoped lang="scss">
    form {
       margin: 0 40px;
       input {
            border-bottom: 1px solid lightgray;
            padding: 20px;
            margin: 10px 0;
            box-sizing: border-box;
        }
        button {
            padding: 1px 15px;
            height: 2em;
            position: relative;
            left: 80%;
        }
    }
</style>