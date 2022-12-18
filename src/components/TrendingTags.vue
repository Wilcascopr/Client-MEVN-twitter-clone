<template>
    <div class="right-bar">
        <form >
            <div>
                <img src="../assets/search.svg">
                <input type="text" placeholder="Search Twitter" v-model="criteria" @keyup="search">
            </div>
        </form>
        <div class="follow" v-if="usersResults.length && criteria.length">
            <h4>Results</h4>
            <div v-for="(user, idx) in usersResults" :key="user._id" class="popular-user">
                <router-link :to="{ name: 'profile', params: { id: user._id }}" v-if="idx < 3">
                    <div style="font-weight: bold">{{user.name}}</div>
                    <div>{{user.email}}</div>
                </router-link>
            </div>
        </div>
        <div class="follow" v-if="users.length">
            <h3>Who to follow</h3>
            <div v-for="(user, idx) in users" :key="user._id" class="popular-user" >
                <router-link :to="{ name: 'profile', params: { id: user._id }}" v-if="idx < 3">
                    <div style="font-weight: bold">{{user.name}}</div>
                    <div>{{user.email}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { usegetUsers } from '@/composables/useUserMethods';
import { ref } from 'vue';

const users = ref([]);
const usersResults = ref([]);
//const user = ref([]);
const criteria = ref('');

const search = () => {
    if (criteria.value !== '') {
        usersResults.value = users.value.filter(user => user.name.toLowerCase().includes(criteria.value.toLowerCase()))
    } else {
        usersResults.value = []
    }
}

const { errorEightU, getUsers } = usegetUsers();

getUsers()
    .then(data => { users.value = data; usersResults.value = data } )
    .catch(err => console.log(err, errorEightU.value))

</script>

<style scoped lang="scss">
    .right-bar {
        .follow {
            display: flex;
            overflow: hidden;
            flex-direction: column;
            align-items: center;
            text-align: center;
            background: rgba(245, 243, 243, 0.5);
            border-radius: 20px;
            padding: 5px 0;
            margin: 20px auto;
            .popular-user {
                padding: 0 2px;
                width: 100%;
                margin: 2px 0;
                height: fit-content;
                text-align: left;
                display: flex;
                align-items: center;
                justify-content: space-between;
                button {
                    height: 1.5em;
                }
            }
            .popular-user:hover {
                background: rgb(216, 216, 216);
            }
        }
        form {
            margin: 5px 20px;
            > div {
                background: #eee;
                padding: 5px;
                display: flex;
                border-radius: 20px;
                align-items: center;
                border: 1px solid lightgray;
                img {
                    height: 1.2em;
                }
            }
            > div:focus-within {
                border: 2px solid rgb(29,155,240);
                background: white;
            }
            input {
                padding: 5px;
                border: none;
                width: 90%;
                background: inherit;
            }
            input:focus-visible {
                outline: none;
            }
        }
    }
          
</style>