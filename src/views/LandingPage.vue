<template>
  <div class="home">
    <SignUp v-if="signup" 
    @toggle="signup = !signup"
     />
    <VueLogin v-else 
    @toggle="signup = !signup"
    @login="router.push({ name: 'homepage' })"/>
  </div>
</template>

<script>
/* eslint-disable */
import VueLogin from '@/components/VueLogin.vue';
import SignUp from '@/components/SignUp.vue';
import { useRefresh } from '@/composables/useUserMethods';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LandingPage',
  components: {
    VueLogin, SignUp
  },
  setup() {
    const signup = ref(true);
    const router = useRouter();

    const { errorThreeU, refresh } = useRefresh();

    refresh()
      .then(res => {if (!errorThreeU.value) router.push({ name: 'homepage' })})
      .catch()

    return { signup, router }
  }
}
</script>

<style lang="scss">
    .home {
      display: flex;
      margin: 20px auto;
      justify-content: center;
    }
</style>
