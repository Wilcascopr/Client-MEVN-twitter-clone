<template>
    <div class="left-bar">
        <router-link :to="{ name: 'homepage' }">
            <div class="options">
                <img src="../assets/home.png" >
                <span>Home</span>
            </div>
        </router-link>
        <router-link :to="{ name: 'profile' , params: { id: user.userID }}">
            <div class="options">
                <img src="../assets/person.png" >
                <span>Profile</span>
            </div>
        </router-link>
        <nav @click="(toggle = !toggle)" class="empty">
            <div>
                <span v-if="user"> {{user.name}} </span>
                <div v-if="user"> {{user.email}} </div>
            </div>
            <img src="../assets/person.png" class="bp">
            <img src="../assets/more_horiz.png" >
        </nav>
        <transition name="fade">
            <div v-if="toggle" class="logout">
                <span @click="handleLogout">Log out</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { onUnmounted, ref } from 'vue';
import { useLogout } from '@/composables/useUserMethods'
import { useRouter } from 'vue-router';

export default {
    props: ['user'],
    setup() {
        const toggle = ref(false);
        const router = useRouter();
        
        const { errorFiveU, logout } = useLogout(); 


        const atclick = (e) => {
            const options = document.querySelector('.empty');
            if (!options.contains(e.target) && toggle.value) {
                if (!e.target.classList.contains('logout')) {
                    toggle.value = !toggle.value
                }
            }
        }

        document.body.addEventListener('click', atclick)

        onUnmounted(() => {
            document.body.removeEventListener('click', atclick)
        })

        const handleLogout = async () => {
            await logout()
            if (!errorFiveU.value) router.push({ name: 'landing'});
        }

        return { toggle, handleLogout }
    }
    
}
</script>

<style lang="scss">
.left-bar {
    nav {
        cursor: pointer;
        align-items: center;
        display: flex;
        margin: 10px;
        border-radius: 25px;
        padding: 10px;
        width:max-content;
        font-size: 20px;
        img {
            width: 2em;
            height: 2em;
            margin-left: 40px;
        } 
    }
    nav:hover {
        background: #eee;
    }
    .options {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 20px;
        margin: 10px;
        border-radius: 25px;
        width: fit-content;
        padding: 10px;
        img {
            height: 1.5em;
            width: 1.5em;
            margin-right: 10px;
        }
    }
    .options:hover {
        background: #eee;
    }
    .empty {
        background: #eee;
        .bp {
            display: none;
        }
    }
    .logout {
        border: 0.5px solid #eee;
        padding: 5px 0;
        box-shadow: -1px 1px 4px gray;
        width: 200px;
        text-align: center;
        border-radius: 20px;;
        span {
            font-size: 12px;
            width: 100%;
            border-bottom: 1px solid #eee;
        }
    }
    .logout:hover {
        background: none;
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(0.1);
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.4s ease;
}
</style>