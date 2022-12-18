<template>
    <div class="editSection">
        <form @submit.prevent="handleUpdate">
            <div class="head">
                <div>
                    <span @click="$emit('profileE')">X</span>
                    Edit Profile
                </div>
                <button>Save</button>
            </div>
            <div class="field">
                <label>Name: </label>
                <input type="text" v-model="name">
            </div> 
            <div class="field">
                <label>Bio</label>
                <textarea v-model="bio"></textarea>
            </div>
        </form>
    </div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useUpdateProfile } from '@/composables/useUserMethods'

export default {
    props: ['loggedUser'],
    setup(props) {
        const bio = ref('');
        const name = ref('');
        const { errorSixU, updateProfile } = useUpdateProfile();

        onBeforeMount(() => {
            bio.value = props.loggedUser.bio
            name.value = props.loggedUser.name
        })


        const handleUpdate = async () => {
            await updateProfile({ 
                userID: props.loggedUser.userID,
                 name: name.value, 
                 bio: bio.value, 
                 accessToken: props.loggedUser.accessToken, 
            })
            if (!errorSixU.value) window.location.reload();
        }

        return { name, bio, handleUpdate }
    }
}
</script>

<style lang="scss">
    .editSection {
        margin: 100px auto;
        padding: 20px;
        box-shadow: 1px -1px 4px gray;
        background: white;
        width: 400px;
        height: 300px;
        border-radius: 20px;
        form {
            button {
                background: black;
                color: white;
                height: 2em;
                width: 60px;
            }
        }
        .head {
            padding: 10px 0;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid lightgray;
            span {
                margin-right: 20px;
            }
        }
    }
</style>