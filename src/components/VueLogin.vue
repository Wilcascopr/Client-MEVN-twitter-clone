<template>
   <div class="Sign">
       <img src="../assets/logo.png" alt="">
       <h2>Sign in to Twitter</h2>
       <form @submit.prevent="handleLogin">
           <div class="field">
               <label>Email</label>
               <input type="email" v-model="email">
           </div>
           <div class="field">
               <label>Password</label>
               <input type="password" v-model="password">
           </div>
           <div class="error" v-if="errorTwoU">{{ errMsg }}</div>
           <button>Log in</button>
       </form>
       <div>Don't have an accoount? <span @click="emitToggle">Sign Up</span></div>
   </div> 
</template>

<script>
import { useLogin } from '@/composables/useUserMethods'
import { ref } from 'vue';

export default {
  name: 'VueLogin',
  setup(props, context) {
    const email = ref('');
    const password = ref('');
    const errMsg = ref('');

    const { errorTwoU, login } = useLogin();

      const emitToggle = () => {
         context.emit('toggle')
      }

      const handleLogin = async () => {
        await login({ email: email.value, password: password.value })

        if (!errorTwoU.value) {
          context.emit('login')
        } else {
          errMsg.value = 'Invalid credentials, please check your email or password'
        }

      }

      return { emitToggle, login, email, password, handleLogin, errorTwoU, errMsg }
  }
}
</script>
