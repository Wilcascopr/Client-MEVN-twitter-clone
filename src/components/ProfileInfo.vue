<template>
    <div class="profile">
        <div class="header">
            <div>
                <span>{{user.name}}</span>
                <div class="small">{{user.email}}</div>
            </div>
            <button 
            v-if="(user.email !== loggedUser.email && !user.followers.includes(loggedUser.userID))"
            @click="$emit('followE', $event)"
            >Follow</button>
            <button class="unfollow"
            v-else-if="user.followers.includes(loggedUser.userID)"
            @click="$emit('followE', $event)"
            > <span>Following</span>
            </button>
            <button @click="$emit('profileE'); profile = !profile" 
            class="edit"
            v-else>Edit Profile</button>
        </div>
        <div class="bio" v-if="user.bio">
            {{user.bio}}
        </div>
        <div class="small"> {{user.following.length}} <span class="small"> Following </span> {{user.followers.length}}  <span class="small" v-if="user.followers.length === 1">Follower</span> <span class="small" v-else> Followers </span></div>
        <div class="backDrop" v-if="profile" @click.self="$emit('profileE'); profile = !profile" id="backDrop">
            <EditProfile :loggedUser="loggedUser" @profileE="$emit('profileE'); profile = !profile"/>
        </div>  
    </div>
</template>

<script>
import EditProfile from '@/components/editProfile.vue';
import { ref } from 'vue';
//import { useUpdateFollow } from '@/composables/useUserMethods';


export default {
    props: ['user', 'loggedUser'],
    components: { EditProfile },
    setup() {
        const profile = ref(false);

        return { profile }
    } 

}
</script>

<style lang="scss">
    .profile {
        padding: 20px;
        width: 100%;
        > div {
            padding: 20px;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            > div {
                span {
                    display: block;
                }
            }
            button {
                color: white;
                font-weight: bold;
                background: black;
                min-height: fit-content;
                width: 100px;
            }
            .unfollow:hover:before {
                content: 'Unfollow';
            }
            .unfollow:hover {
                background: red;
                span {
                    display: none;
                }
            }
            .unfollow {
                span:hover {
                    display: none;
                }
                span {
                    width: 100%;
                    height: 100%;
                }
            }
            .edit {
                background: white;
                border: 1px solid lightgray;
                min-height: fit-content;
                width: 100px;
                color: black;
            }
        }
        .bio {
            font-size: 16px;
        }
    }
</style>