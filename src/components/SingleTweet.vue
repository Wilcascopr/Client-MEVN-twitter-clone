<template>
  <div class="tweet">
    <div v-if="tweetUser">
    <span>{{tweetUser.name}} <span class="small">{{tweetUser.email}}</span> . <span class="small">{{computedDate}}</span></span>     
    </div>
    <p>{{tweet.text}}</p>
    <div class="icons">
      <div>
        <div class="like" @click="handleLike">
          <img src="../assets/favorite.svg" 
          :class=" { liked: tweet.likes.includes(user.userID)} ">
        </div>
        <span class="small"
        :class=" { liked: tweet.likes.includes(user.userID)} "
        v-if="tweet.likes.length"> 
        {{tweet.likes.length}} </span>
      </div>
      <div>
        <div class="comment">
          <img src="../assets/comment.svg">
        </div>
        <span class="small" v-if="tweet.comments.length"> {{tweet.comments.length}} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { usegetUser }  from '@/composables/useUserMethods'
import { ref, computed } from 'vue';
import { useLikeTweet } from '@/composables/useTweetMethods';

export default {
    props: ['tweet', 'user'],
    data(props) {
      const { error, getUser } = usegetUser();
      const { likeTweet } = useLikeTweet();
      const tweetUser = ref(null);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

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
          if (!error.value) console.log(res);
        } else {
          const index = props.tweet.likes.findIndex(user => user === props.user.userID)
          props.tweet.likes.splice(index, 1)
          const res = await likeTweet(props.tweet, props.user.accessToken)
          if (!error.value) console.log(res);
        }
      }

      return { tweetUser, error, computedDate, handleLike }
    }
}
</script>

<style lang="scss">
    .tweet {
        font-size: 12px;
        padding: 20px;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        span {
          font-weight: bold;
          cursor: pointer;
        }
        .small {
          font-size: 11px;
          font-weight: normal;
          cursor: text;
        }
        div {
          display: flex;
          justify-content: space-between;
        }
        .icons {
          display: flex;
          justify-content: space-evenly;
          img {
            height: 1.2em;
          }
          > div {
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
          }
          .like {
            border-radius: 50%;
            padding: 3px;
            img:hover {
              filter: invert(13%) sepia(90%) saturate(6773%) hue-rotate(1deg) brightness(94%) contrast(117%);
            }
            .liked {
              filter: invert(13%) sepia(90%) saturate(6773%) hue-rotate(1deg) brightness(94%) contrast(117%);
            }
            .small.liked {
              color: red;
            }
          }
          .like:hover {
              background: rgba(239, 93, 142,0.5);
          }
          .comment {
            border-radius: 50%;
            padding: 3px;
            img:hover {
              filter: invert(43%) sepia(99%) saturate(1262%) hue-rotate(179deg) brightness(98%) contrast(92%);
            }
          }
          .comment:hover {
            background: rgba(29,155,255, 0.1);
          }
        }
    }
</style>

