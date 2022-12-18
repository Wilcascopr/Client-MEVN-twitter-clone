<template>
    <div>
        <form @submit.prevent="handlenNewTweet">
            <div>
                <div class="small" :class="{ error: text.length > 150 }">{{text.length}}/150</div>
            </div>
            <textarea v-model="text" 
            placeholder="What's happening?"
            @keyup="Adjust"></textarea>
            <div>
                <button>Tweet</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useCrateTweet } from '@/composables/useTweetMethods';

  export default {
    props: ['accessToken'],
    setup(props, context) {
        const { errorTwo, createTweet } = useCrateTweet();
        const text = ref('');
        const tags = ref ([]);

        const handlenNewTweet = async() => {
            if (text.value.length <= 150) {
                const tweet = await createTweet({text: text.value, tags: tags.value }, props.accessToken)
                if (!errorTwo.value) {
                    text.value = ''
                    context.emit('addTweet', tweet)
                }
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
        div {
            display: flex;
            justify-content: flex-end;
            button {
                padding: 1px 15px;
                height: 2em;
            }
        }
    }
</style>
