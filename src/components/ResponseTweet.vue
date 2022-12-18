<template>
    <div id="responseTW">
        <div class="tweetR">
            <div v-if="tweetUser">
                <router-link :to=" { name: 'profile', params: { id: tweetUser.userID }} ">
                    <span> {{tweetUser.name}} <span class="small">{{tweetUser.email}}</span> . <span class="small">{{computedDate}}</span>  </span>   
                </router-link>
            </div>
            <p>{{tweet.text}}</p>
        </div>
        <div v-if="tweetUser"
        class="repl">Replying to <span>{{ tweetUser.email }}</span></div>
        <div v-if="user"><span>{{user.name}}</span></div>
        <form @submit.prevent="handleReplyTweet">
            <textarea v-model="text" 
            placeholder="Tweet your reply"
            @keyup="Adjust"
            ></textarea>
            <button>Tweet</button>
        </form>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { usegetUser }  from '@/composables/useUserMethods';
import { useReplyTweet } from '@/composables/useTweetMethods';
import { useRouter } from 'vue-router';

export default {
    props: ['tweet', 'user'],
    setup(props) {
        const { errorFourU, getUser } = usegetUser();
        const text = ref('');
        const tags = ref([]);
        const tweetUser = ref(null);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const { errorFive, replyTweet } = useReplyTweet();
        const router = useRouter();

        getUser(props.tweet.user).then(data => {
                tweetUser.value = data;
            }).catch(error => console.log(error))

        const Adjust = (e) => {
            e.target.style.height = '2px'
            e.target.style.height = `${e.target.scrollHeight}px`
        }

        const computedDate = computed(() => {
        const date = new Date (props.tweet.date)
        const time = Date.now() - date;
        switch (true) {
            case time > 60*60*24*365*1000:
              return months[date.getMonth()] + ` ${date.getDate()} ${date.getFullYear}`
            case time < 60*60*24*365*1000 && time > 60*60*24*1000:
              return months[date.getMonth()] + ` ${date.getDate()}`
            case time < 60*60*24*1000 && time > 60*60*1000:
              return `${Math.floor(time/(1000*60*60))}h`
            case time < 60*60*1000 && time > 60*1000:
              return `${Math.floor(time/(1000*60))}m`
            case time < 60*1000:
              return `${Math.floor(time/(1000))}s`
            default: 
              return ''
          }
        })


        const handleReplyTweet = async () => {
            await replyTweet({
              tweetID: props.tweet._id,
              text: text.value,
              tags: tags.value,
              accessToken: props.user.accessToken
            })
            if (!errorFive.value) {
                text.value = '';
                router.push({ name: 'tweet', params: { id: props.tweet._id } })
            }
        }

        return { Adjust, computedDate, text, tags, errorFourU, tweetUser, errorFive, handleReplyTweet }
    }

}
</script>

<style lang="scss">
    #responseTW {
        display: block;
        margin: 100px auto;
        padding: 20px;
        background: white;
        width: 400px;
        height: 300px;
        border-radius: 20px;
        form {
          textarea {
            margin: 10px 0;
          }
        }
        div {
          display: inherit;
        }
        > * {
          margin: 10px 0;
        }
        .repl {
          margin: 20px 0;
          span {
            color: rgb(29,155,240);
            font-weight: normal;
          }
        }
    }
</style>
