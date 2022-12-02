<template>
    <div class="left-bar">
        <div>
            <img src="../assets/home.png" >
            <span>Home</span>
        </div>
        <div>
            <img src="../assets/person.png" >
            <span>Profile</span>
        </div>
        <div>
            <img src="../assets/tag.png" >
            <span>Explore</span>
        </div>
        <nav @click="toggleLogout" class="empty">
            <div>
                <span v-if="user" > {{user.name}} </span>
                <div v-if="user" > {{user.email}} </div>
            </div>
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
import { ref } from 'vue';
import { useLogout } from '@/composables/useUserMethods'
import { useRouter } from 'vue-router';

export default {
    props: ['user'],
    setup() {
        const toggle = ref(false);
        const router = useRouter();
        
        const { error, logout } = useLogout(); 

        document.body.addEventListener('click', (e) => {
                const options = document.querySelector('.empty');
                if (!e.target.classList.contains('logout') && !options.contains(e.target) && toggle.value === true) {
                    toggle.value = !toggle.value
                }
            })

        const toggleLogout = () => {
            toggle.value = !toggle.value
        }   

        const handleLogout = async () => {
            await logout()
            if (!error.value) router.push({ name: 'landing'});
        }

        return { toggle, toggleLogout, handleLogout }
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
        width: fit-content;
        font-size: 14px;
        img {
            width: 2em;
            height: 2em;
            margin-left: 40px;
        } 
    }
    nav:hover {
        background: lightgray;
    }
    > div {
        cursor: pointer;
        display: flex;
        align-items: center;
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
    > div:hover {
        background: lightgray;
    }
    .logout {
        border: 0.5px solid lightgray;
        box-shadow: -1px 1px 4px gray;
        width: 200px;
        text-align: center;
        span {
            font-size: 11px;
            width: 100%;
            border-bottom: 1px solid lightgray;
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