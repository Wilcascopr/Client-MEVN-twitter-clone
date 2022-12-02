<template>
    <div>
        <form @submit.prevent="handlenNewTweet">
            <textarea v-model="text" 
            placeholder="What's happening?"
            @keyup="Adjust"></textarea>
            <button>Tweet</button>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useCrateTweet } from '@/composables/useTweetMethods';

  export default {
    props: ['accessToken'],
    setup(props, context) {
        const { error, createTweet } = useCrateTweet();
        const text = ref('');
        const tags = ref ([]);

        const handlenNewTweet = async() => {
            const tweet = await createTweet({text: text.value, tags: tags.value }, props.accessToken)
            if (!error.value) {
                text.value = ''
                context.emit('addTweet', tweet)
            }
        }

        const Adjust = (e) => {
            e.target.style.height = '1px';
            e.target.style.height = `${e.target.scrollHeight}px`
        }

        return { text, handlenNewTweet, tags, Adjust }
    }
  }
</script>
  
<style scoped lang="scss">
    form {
       margin: 0 40px;
       textarea {
            height: max-content;
            width: 100%;
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
