<template>
  <div class="home">
    <SignUp v-if="signup" 
    @Toggle="signup = !signup"
     />
    <VueLogin v-else 
    @Toggle="signup = !signup"
    @Login="router.push({ name: 'homepage' })"/>
  </div>
</template>

<script>
/* eslint-disable */
import VueLogin from '@/components/VueLogin.vue';
import SignUp from '@/components/SignUp.vue';
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
