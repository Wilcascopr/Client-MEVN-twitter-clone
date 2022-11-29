<template>
  <div class="tweet">
    <div v-if="user"
    ><span>{{user.name}}</span> {{user.email}}     {{tweet.date}}</div>
    <p>{{tweet.text}}</p>
  </div>
</template>

<script>
import usegetUser from '@/composables/usegetUser'
import { ref } from 'vue';

export default {
    props: ['tweet'],
    data(props) {
      const { error, getUser } = usegetUser();
      const user = ref(null)

      getUser(props.tweet.user).then(data => {
          user.value = data;
      }).catch(error => console.log(error))

      return { user, error }
    }
}
</script>

<style lang="scss">
    .tweet {
        font-size: 12px;
        padding: 20px 20px;
        border-top: 1px solid lightgray;
        border-bottom: 1px solid lightgray;
        span {
          font-weight: bold;
          cursor: pointer;
        }
    }
</style>