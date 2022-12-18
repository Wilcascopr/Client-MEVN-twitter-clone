<template>
<div class="brNormal">
  <nav class="head">
        <span class="material-symbols-outlined" @click="$emit('cellBar'); cellBar = !cellBar">face</span>
        <h3><span>{{message}}</span></h3>
        <span class="material-symbols-outlined">auto_awesome</span>
  </nav>
  <slot>
  </slot>
  <div class="backDrop" v-if="cellBar" @click.self=" $emit('cellBar'); cellBar = !cellBar">
      <div class="cell-bar" v-if="user">
          <div class="user-info">
              <span>{{user.name}}</span>
              <div>{{user.email}}</div>
          </div>
          <router-link :to="{ name: 'homepage' }" >
            <div class="optionsCB">
                <span class="material-symbols-outlined">home</span>
                Home
            </div>
          </router-link>
          <router-link :to="{ name: 'profile', params: { id: user.userID} }" >
            <div class="optionsCB">
                <span class="material-symbols-outlined">person</span>
                Profile
            </div>
          </router-link>
          <router-link :to="{ name: 'searchPhone' }" >
            <div class="optionsCB">
                <span class="material-symbols-outlined">manage_search</span>
                Search User
            </div>
          </router-link>
            <div class="optionsCB" @click="handleLogout">
                <span class="material-symbols-outlined">logout</span>
                Log out
            </div>
      </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLogout } from '@/composables/useUserMethods';

    export default {
    props: ["message", "user"],
    setup() {
        const cellBar = ref(false);
        const { errorFiveU, logout } = useLogout();
        const router = useRouter();

        const handleLogout = async () => {
            await logout();
            if (!errorFiveU.value) {
                router.push( { name: 'landing'})
            }
        }

        return {  cellBar, handleLogout }
    }
}
</script>

<style lang="scss">
    #brCell, .brNormal {
      position: sticky;
      top: 0;
    }
    .head {
            width: 100%;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            background: white;
            opacity: 80%;
            .material-symbols-outlined {
                display: none;
                border-radius: 50%;
                padding: 2px;
            }
            .material-symbols-outlined:hover {
              background: #eee;
              cursor: pointer;
            }
        }
        .cell-bar {
          background: white;
          display: sticky;
          left: 0;
          top: 0;
          width: 80%;
          min-height: 100vh;
          padding: 5px;
          .optionsCB {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: 500;
            margin: 5px;
          }
          .optionsCB:hover {
            background: #eee;
          }
          .user-info {
            margin: 5px;
          }
        }
</style>