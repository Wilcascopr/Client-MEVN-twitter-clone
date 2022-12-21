<template>
  <div class="tweet" @click.self="$router.push({ name: 'tweet', params: { id: tweet._id } })">
    <div v-if="tweetUser" @click.stop class="user" 
    :class="{ relative: !backDrop }" >
      <router-link :to=" { name: 'profile', params: { id: tweetUser.userID }} ">
          <span> {{tweetUser.name}} <span class="small">{{tweetUser.email}}</span> . <span class="small">{{computedDate}}</span>  </span>   
      </router-link>
      <div>
        <span class="material-symbols-outlined" :class="tweet._id"
        v-if="((tweetUser.userID === user.userID) && !options)"
        @click="(options = !options)">more_horiz</span>
      </div>
      <div v-if="options" class="optionsT">
            <div id="delete"
            @click="async () => {
              await deleteTweet(tweet._id, user.accessToken)
              if (!errorEight) $emit('delete')
            }"><span class="material-symbols-outlined">delete</span> Delete </div>
      </div>
    </div>
    <p @click="$router.push({ name: 'tweet', params: { id: tweet._id } })">{{tweet.text}}</p>
    <div class="icons" >
        <div class="like">
            <span class="material-symbols-outlined" 
            :class=" { liked: tweet.likes.includes(user.userID)} "
            @click="handleLike">
              favorite
            </span>        
            <span style="font-weight: normal; font-size: 1em; margin-left:10px"
            v-if="tweet.likes.length"> 
              {{tweet.likes.length}} 
            </span>
        </div>
        <div class="comments">
            <span class="material-symbols-outlined" @click="$emit('responseE'); responseINS = !responseINS">chat</span>
            <span  style="font-weight: normal; font-size: 1em; margin-left:10px" v-if="tweet.comments.length"> {{tweet.comments.length}} </span>
        </div>
    </div>
    <div class="backDrop" v-if="responseINS" @click.self="$emit('responseE'); responseINS = !responseINS" >
        <ResponseTweet :tweet="tweet" :user="user"/>
    </div>
  </div>
</template>

<script>
import { usegetUser }  from '@/composables/useUserMethods'
import { ref, computed, onUnmounted } from 'vue';
import { useLikeTweet, useDeleteTweet } from '@/composables/useTweetMethods';
import ResponseTweet from './ResponseTweet.vue';

export default {
    props: ['tweet', 'user', 'backDrop'],
    components: { ResponseTweet },
    data(props) {
      const { errorFourU, getUser } = usegetUser();
      const { errorEight, deleteTweet } = useDeleteTweet();
      const { likeTweet } = useLikeTweet();
      const tweetUser = ref(null);
      const options = ref(false);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      const responseINS = ref(false)

      getUser(props.tweet.user).then(data => {
          tweetUser.value = data;
      }).catch(error => console.log(error))

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

      const handleLike = async () => {
        if (!props.tweet.likes.includes(props.user.userID)) {
          props.tweet.likes.push(props.user.userID)
          const res = await likeTweet(props.tweet, props.user.accessToken)
          if (!errorFourU.value) console.log(res);
        } else {
          const index = props.tweet.likes.findIndex(user => user === props.user.userID)
          props.tweet.likes.splice(index, 1)
          const res = await likeTweet(props.tweet, props.user.accessToken)
          if (!errorFourU.value) console.log(res);
        }
      }

      const atclick = (e) => {
          if (options.value && !e.target.id.includes(props.tweet._id)) {
              const res = document.querySelector('.optionsT');
              if (!res.contains(e.target)) {
                options.value = !options.value;
              }
          }
      }

      document.body.addEventListener('click', atclick)

      onUnmounted(() => {
        document.body.removeEventListener('click', atclick)
      })

      return { tweetUser, errorFourU, computedDate, handleLike, options, responseINS, deleteTweet, errorEight }
    }
}
</script>

<style lang="scss">
    .tweet {
        font-size: 14px;
        padding: 20px;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        div {
          display: flex;
          justify-content: space-between;
        }
        .icons {
          display: flex;
          justify-content: space-evenly;
          > div {
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            div {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
          .like {
            .material-symbols-outlined:hover {
              transition: all 0.3s ease;
              color: red;
              background: rgba(239, 93, 142,0.5);
            }
            .small.liked {
              color: red;
            }
          }
          .liked {
            color: red;
           }
          .comments {
            .material-symbols-outlined:hover {
              transition: all 0.3s ease;
              color: rgb(29,155,240);
              background: rgba(29,155,255, 0.1);
            }
          }
        }
    }
</style>

